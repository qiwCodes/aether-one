"use client";

import dynamic from "next/dynamic";
import { motion, type MotionValue } from "framer-motion";
import type { ProductFinishId } from "@/components/product/productFinish";

const ProductStage = dynamic(
  () => import("./ProductStage").then((m) => m.ProductStage),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center md:min-h-[min(50dvh,520px)] lg:min-h-[min(55dvh,600px)]">
        <motion.div
          className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    ),
  },
);

type StageVariant = "hero" | "standard" | "overview";
type StageQuality = "auto" | "mobile";

type StagePreset = {
  fitMargin: number;
  cameraX: number;
  cameraZ: number;
  cameraY: number;
  fov: number;
  shiftX: number;
  shiftY: number;
  baseRotation: [number, number, number];
  motionDamping: number;
  idleYawSpeed?: number;
  pointerInfluence?: number;
  clipCamera: boolean;
};

/** Shared framing so Overview “Product” matches Hero on-screen scale (Bounds + camera). */
const heroFraming: StagePreset = {
  fitMargin: 1.12,
  /** Optical center: slight +cameraX / −shiftX nudges subject left in frame (matches asymmetric silhouette from baseRotation). */
  cameraX: 0.07,
  cameraZ: 2.42,
  cameraY: 0.02,
  fov: 40,
  shiftX: -0.14,
  shiftY: -0.18,
  baseRotation: [0.12, -0.42, 0.04],
  motionDamping: 1,
  /** No idle turntable — rotation comes only from scroll-linked yaw. */
  idleYawSpeed: 0,
  pointerInfluence: 0,
  /** Hero path scroll-drives large Y spin; looser clip avoids mesh popping at extremes. */
  clipCamera: false,
};

/**
 * drei Bounds: lower margin + slightly wider FOV = camera moves in; product dominates the canvas.
 * baseRotation / shiftY keep campaign silhouette; X tuned so hero + product frame read centered on the canvas.
 */
const stagePresets: Record<StageVariant, StagePreset> = {
  hero: { ...heroFraming },
  standard: {
    fitMargin: 0.52,
    cameraX: 0,
    cameraZ: 2.35,
    cameraY: 0.05,
    fov: 44,
    shiftX: 0,
    shiftY: -0.08,
    baseRotation: [0, 0, 0],
    motionDamping: 1,
    clipCamera: true,
  },
  overview: {
    ...heroFraming,
    /**
     * When the scroll-linked stage lands inside the Overview frame,
     * the DOM box clips overflow to prevent bleed over the copy column.
     * Give the silhouette a little more breathing room so it doesn't read "cropped".
     */
    fitMargin: 1.35,
    shiftY: -0.12,
  },
};

export function ProductStageLoader({
  className,
  parallaxClassName,
  variant = "standard",
  finish = "obsidian",
  quality = "auto",
  scrollYawExtra,
  scrollShiftXExtra,
  idleYawScale,
  disableIntroMotion = false,
  idleYawSpeedOverride,
}: {
  className?: string;
  parallaxClassName?: string;
  variant?: StageVariant;
  finish?: ProductFinishId;
  quality?: StageQuality;
  scrollYawExtra?: MotionValue<number>;
  scrollShiftXExtra?: MotionValue<number>;
  idleYawScale?: MotionValue<number>;
  disableIntroMotion?: boolean;
  idleYawSpeedOverride?: number;
}) {
  const p = stagePresets[variant];
  const isHero = variant === "hero";
  const idleYaw =
    idleYawSpeedOverride !== undefined ? idleYawSpeedOverride : p.idleYawSpeed;

  const glTuning =
    quality === "mobile"
      ? ({
          dpr: [1, 1.35] as [number, number],
          antialias: false,
          powerPreference: "low-power" as const,
        } as const)
      : ({
          dpr: undefined,
          antialias: undefined,
          powerPreference: undefined,
        } as const);

  const wrapClass = `h-full w-full min-h-0 min-w-0 max-w-none ${parallaxClassName ?? ""}`;
  const wrapStyle = {
    backgroundColor: "transparent" as const,
    boxShadow: "none" as const,
  };

  const stage = (
    <ProductStage
      className={className}
      finish={finish}
      fitMargin={p.fitMargin}
      cameraX={p.cameraX}
      cameraZ={p.cameraZ}
      cameraY={p.cameraY}
      fov={p.fov}
      shiftX={p.shiftX}
      shiftY={p.shiftY}
      scrollShiftXExtra={scrollShiftXExtra}
      baseRotation={p.baseRotation}
      motionDamping={p.motionDamping}
      idleYawSpeed={idleYaw}
      pointerInfluence={p.pointerInfluence}
      scrollYawExtra={scrollYawExtra}
      idleYawScale={idleYawScale}
      clipCamera={p.clipCamera}
      dpr={glTuning.dpr}
      antialias={glTuning.antialias}
      powerPreference={glTuning.powerPreference}
    />
  );

  if (disableIntroMotion) {
    return (
      <div className={wrapClass} style={wrapStyle}>
        {stage}
      </div>
    );
  }

  return (
    <motion.div
      className={wrapClass}
      style={wrapStyle}
      initial={isHero ? { opacity: 0, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {stage}
    </motion.div>
  );
}
