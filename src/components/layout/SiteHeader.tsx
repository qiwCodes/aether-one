"use client";

import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useProductFinish } from "@/components/providers/ProductFinishProvider";
import { PremiumLink } from "@/components/ui/PremiumButton";

const themeEase = [0.25, 0.1, 0.25, 1] as const;
const themeDuration = 1.5;

export function SiteHeader() {
  const { finish } = useProductFinish();
  const r = useMotionValue(6);
  const g = useMotionValue(6);
  const b = useMotionValue(6);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 120], [0, 0.82]);
  const headerBg = useTransform([r, g, b, headerOpacity], ([rv, gv, bv, o]) => {
    return `rgba(${Math.round(rv as number)},${Math.round(gv as number)},${Math.round(bv as number)},${o as number})`;
  });
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.12]);

  useEffect(() => {
    const light = finish === "ivory_gilt";
    const target = light
      ? { r: 240, g: 237, b: 230 }
      : { r: 6, g: 6, b: 6 };
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opts = reduce
      ? { duration: 0 }
      : { duration: themeDuration, ease: themeEase };
    animate(r, target.r, opts);
    animate(g, target.g, opts);
    animate(b, target.b, opts);
  }, [finish, r, g, b]);

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-md"
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--foreground)]"
        style={{ opacity: borderOpacity }}
      />
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <Link
          href="#"
          className="font-display text-lg tracking-[0.02em] text-zinc-100 md:text-xl"
        >
          Aether
        </Link>
        <nav className="hidden items-center gap-10 text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500 md:flex">
          <a href="#overview" className="transition-colors hover:text-zinc-200">
            Overview
          </a>
          <a href="#sound" className="transition-colors hover:text-zinc-200">
            Sound
          </a>
          <a href="#craft" className="transition-colors hover:text-zinc-200">
            Craft
          </a>
          <a href="#specs" className="transition-colors hover:text-zinc-200">
            Specs
          </a>
        </nav>
        <PremiumLink
          href="#purchase"
          variant="solid"
          className="px-5 py-2.5 text-[11px]"
        >
          Pre-order
        </PremiumLink>
      </div>
    </motion.header>
  );
}
