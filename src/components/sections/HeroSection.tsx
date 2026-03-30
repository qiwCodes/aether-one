"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PRODUCT_CANVAS_BOX_CLASSNAME } from "@/components/product/productCanvasBox";
import { PRODUCT_FINISHES } from "@/components/product/productFinish";
import { useProductFinish } from "@/components/providers/ProductFinishProvider";
import { PremiumLink } from "@/components/ui/PremiumButton";
import { ScrollCue } from "@/components/ui/ScrollCue";

/** Desktop: one row height so grid resolves to a real box (3D lives in ScrollLinkedProductLayer). */
const HERO_ROW_MD =
  "md:h-[min(94dvh,calc(100dvh-5.25rem))] md:min-h-[82vh] md:max-h-none";

const finishSwatchClass: Record<
  (typeof PRODUCT_FINISHES)[number]["id"],
  string
> = {
  obsidian:
    "border-[#2a2a2e] bg-[radial-gradient(circle_at_30%_25%,#3a3a40_0%,#141416_65%)]",
  ivory_gilt:
    "border-[#c9a862]/50 bg-[linear-gradient(145deg,#faf6ef_0%,#e8dfd0_45%,#f0e8dc_100%)]",
};

export function HeroSection() {
  const { finish, setFinish } = useProductFinish();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityTop = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate min-h-[100dvh] w-full overflow-x-clip overflow-y-hidden md:overflow-y-visible"
    >
      {/* Layered backdrop — warm key on product, cool falloff at edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--hero-base)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-radial-warm)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-radial-cool)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-vignette)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: "var(--noise-opacity)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1500px] flex-col px-5 pb-32 pt-24 sm:px-8 md:px-12 md:pb-28 md:pt-28 lg:px-16">
        <div
          className={`grid min-h-0 w-full min-w-0 flex-1 grid-cols-1 items-stretch gap-12 overflow-visible md:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] md:gap-x-6 md:gap-y-0 lg:gap-x-10 xl:gap-x-12 ${HERO_ROW_MD}`}
        >
          {/* Copy — desktop left; mobile below spacer */}
          <motion.div
            style={{ y: yText, opacity: opacityTop }}
            className="relative z-30 order-2 flex min-w-0 flex-col justify-center gap-8 md:order-1 md:max-w-lg md:gap-9 md:pr-2 lg:max-w-xl lg:pr-6"
          >
            <div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--site-label-warm)" }}
              >
                Wireless · Over-ear · Flagship
              </p>
              <h1 className="mt-5 whitespace-nowrap font-display text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-zinc-50">
                <span>Aether</span>{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--hero-title-one-from), var(--hero-title-one-via), #c9a862)",
                  }}
                >
                  One
                </span>
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-zinc-400 md:text-lg md:leading-relaxed">
              Engineered for silence you can wear. Spatial depth without
              theatrics.
            </p>
            <div className="pointer-events-auto">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.28em]"
                style={{ color: "var(--site-label-warm)" }}
              >
                Finish
                <span className="ml-2 font-normal normal-case tracking-normal text-zinc-600">
                  เลือกสี
                </span>
              </p>
              <div
                className="mt-3 flex flex-wrap items-stretch gap-2 sm:gap-3"
                role="radiogroup"
                aria-label="Finish / สีตัวเครื่อง"
              >
                {PRODUCT_FINISHES.map((f) => {
                  const active = finish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={`${f.name}. ${f.note}`}
                      onClick={() => setFinish(f.id)}
                      className={`flex min-h-[44px] items-center gap-3 rounded-sm border px-3 py-2 text-left transition-colors duration-300 sm:px-4 ${
                        active
                          ? "border-[#c9a862]/35 bg-[var(--finish-active-bg)] text-zinc-100 shadow-[inset_0_0_0_1px_rgba(201,168,98,0.12)]"
                          : "border-[color:var(--site-border-medium)] bg-transparent text-zinc-500 hover:border-[color:var(--finish-inactive-hover-border)] hover:text-zinc-300"
                      }`}
                    >
                      <span
                        className={`relative h-9 w-9 shrink-0 rounded-full border-2 shadow-inner ${finishSwatchClass[f.id]} ${
                          active
                            ? "ring-2 ring-[#c9a862]/40 ring-offset-2 ring-offset-[var(--hero-base)]"
                            : ""
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium tracking-wide text-zinc-200">
                          {f.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-zinc-500">
                          {f.note}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="pointer-events-auto flex flex-wrap gap-3 sm:gap-4">
              <PremiumLink href="#purchase" className="px-7 py-3 text-[12px]">
                Buy now
              </PremiumLink>
              <PremiumLink
                href="#craft"
                variant="ghost"
                className="px-7 py-3 text-[12px]"
              >
                Explore design
              </PremiumLink>
            </div>
          </motion.div>

          {/* Spacer: same horizontal nudge as Overview product column so scroll-linked left interp doesn’t drift. */}
          <div className="relative z-10 order-1 flex min-h-0 min-w-0 flex-col md:order-2 md:h-full md:self-stretch lg:translate-x-8 xl:translate-x-12">
            <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center">
              <div
                id="scroll-product-hero-anchor"
                className={`relative ${PRODUCT_CANVAS_BOX_CLASSNAME} shrink-0`}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <motion.footer
          style={{ opacity: opacityTop }}
          className="relative z-30 mt-8 flex shrink-0 flex-col gap-8 border-t border-[color:var(--site-border)] pt-8 md:mt-6 md:flex-row md:items-center md:justify-between md:pt-10"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] text-zinc-500">
            <span className="font-medium tracking-wide text-zinc-400">
              Adaptive ANC
            </span>
            <span
              className="hidden h-3 w-px sm:block"
              style={{ backgroundColor: "var(--site-border-strong)" }}
              aria-hidden
            />
            <span>40mm beryllium-class drivers</span>
            <span
              className="hidden h-3 w-px md:block"
              style={{ backgroundColor: "var(--site-border-strong)" }}
              aria-hidden
            />
            <span className="text-zinc-600">Up to 38h playback</span>
          </div>
        </motion.footer>
      </div>

      <ScrollCue />
    </section>
  );
}
