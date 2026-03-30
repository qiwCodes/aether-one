"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProductStageLoader } from "@/components/product/ProductStageLoader";
import { useProductFinish } from "@/components/providers/ProductFinishProvider";

/** Progress (0–1) at which hero → product-frame interpolation finishes; after this, pose stays until scroll back. */
const LAND_PROGRESS = 0.58;

type ScrollLinkedProductLayerProps = {
  trackRef: React.RefObject<HTMLElement | null>;
  quality?: "auto" | "mobile";
};

export function ScrollLinkedProductLayer({
  trackRef,
  quality = "auto",
}: ScrollLinkedProductLayerProps) {
  const { finish } = useProductFinish();
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  /** Linear progress so yaw + layout reverse 1:1 when scrolling up (spring caused asymmetric lag). */
  const scrollYaw = useTransform(
    scrollYProgress,
    [0, LAND_PROGRESS, 1],
    [0, Math.PI * 1.35, Math.PI * 1.35],
  );

  /**
   * Optical recentering: as the silhouette spins into the overview frame it reads a bit right-heavy.
   * This nudges the stage left after landing so it stays visually centered without Bounds observe drift.
   */
  const scrollShiftX = useTransform(
    scrollYProgress,
    [0, LAND_PROGRESS, 1],
    [0, -0.16, -0.16],
  );

  const idleYawScale = useTransform(
    scrollYProgress,
    [0, LAND_PROGRESS - 0.08, LAND_PROGRESS, 1],
    [1, 1, 0, 0],
  );

  const fadeOut = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  const [landed, setLanded] = useState(false);
  const stageBoxRef = useRef<HTMLDivElement>(null);

  const applyStageOverflow = useCallback((value: number, desktop: boolean) => {
    const isLanded = desktop && value >= LAND_PROGRESS;
    const el = stageBoxRef.current;

    if (el) {
      el.style.overflow = isLanded ? "hidden" : "visible";
    }

    return isLanded;
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      const desktop = mql.matches;
      setIsDesktop(desktop);
      const isLanded = applyStageOverflow(scrollYProgress.get(), desktop);
      setLanded((current) => (current === isLanded ? current : isLanded));
    };
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [applyStageOverflow, scrollYProgress]);

  const heroRectRef = useRef<DOMRect | null>(null);
  const frameRectRef = useRef<DOMRect | null>(null);

  const boxLeft = useMotionValue(0);
  const boxTop = useMotionValue(0);
  const boxW = useMotionValue(0);
  const boxH = useMotionValue(0);

  const applyLayout = useCallback(() => {
    const hr = heroRectRef.current;
    const fr = frameRectRef.current;
    if (!hr) return;
    const w = hr.width;
    const h = hr.height;
    if (!fr) {
      boxLeft.set(hr.left);
      boxTop.set(hr.top);
      boxW.set(w);
      boxH.set(h);
      return;
    }
    const p = Math.min(Math.max(scrollYProgress.get(), 0), 1);
    const t = p < LAND_PROGRESS ? p / LAND_PROGRESS : 1;
    /** Keep hero canvas size so Bounds framing stays constant — only translate; land centered in overview frame. */
    const endLeft = fr.left + (fr.width - w) / 2;
    const endTop = fr.top + (fr.height - h) / 2;
    boxLeft.set(hr.left + (endLeft - hr.left) * t);
    boxTop.set(hr.top + (endTop - hr.top) * t);
    boxW.set(w);
    boxH.set(h);
  }, [scrollYProgress, boxLeft, boxTop, boxW, boxH]);

  const syncRects = useCallback(() => {
    const h = document.getElementById("scroll-product-hero-anchor");
    const f = document.getElementById("scroll-product-frame");
    heroRectRef.current = h?.getBoundingClientRect() ?? null;
    frameRectRef.current = f?.getBoundingClientRect() ?? null;
    applyLayout();
  }, [applyLayout]);

  useLayoutEffect(() => {
    const h = () => document.getElementById("scroll-product-hero-anchor");
    const f = () => document.getElementById("scroll-product-frame");

    syncRects();
    const ro = new ResizeObserver(() => syncRects());
    const hEl = h();
    const fEl = f();
    if (hEl) ro.observe(hEl);
    if (fEl) ro.observe(fEl);

    window.addEventListener("scroll", syncRects, { passive: true });
    window.addEventListener("resize", syncRects);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", syncRects);
      window.removeEventListener("resize", syncRects);
    };
  }, [syncRects]);

  useMotionValueEvent(scrollYProgress, "change", applyLayout);

  /** Clip WebGL to the interpolated box once it has landed in overview — otherwise the model bleeds over the copy column. */
  const syncStageOverflow = useCallback(() => {
    const v = scrollYProgress.get();
    const isLanded = applyStageOverflow(v, isDesktop);
    setLanded((current) => (current === isLanded ? current : isLanded));
  }, [applyStageOverflow, isDesktop, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", syncStageOverflow);

  return (
    <motion.div
      id="scroll-linked-product"
      className="pointer-events-none fixed inset-0 z-[25]"
      style={{ opacity: fadeOut }}
      aria-hidden
    >
      <motion.div
        ref={stageBoxRef}
        className="pointer-events-none scroll-linked-product-stage rounded-sm"
        style={{
          position: "fixed",
          left: boxLeft,
          top: boxTop,
          width: boxW,
          height: boxH,
          willChange: "left, top, width, height",
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-[52%] h-[min(44vh,380px)] w-[min(92%,680px)] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.12)_0%,rgba(201,162,62,0.05)_35%,transparent_70%)] blur-2xl md:h-[min(56vh,520px)]"
          aria-hidden
        />
        <ProductStageLoader
          variant={isDesktop && landed ? "overview" : "hero"}
          finish={finish}
          quality={quality}
          scrollYawExtra={scrollYaw}
          scrollShiftXExtra={scrollShiftX}
          idleYawScale={idleYawScale}
          disableIntroMotion
          className="h-full w-full min-h-0 max-w-none"
        />
      </motion.div>
    </motion.div>
  );
}
