"use client";

import { PRODUCT_CANVAS_BOX_CLASSNAME } from "@/components/product/productCanvasBox";
import { Reveal } from "@/components/ui/Reveal";

export function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative z-10 border-t border-[color:var(--site-border)] pt-36 pb-24 md:pt-44 md:pb-36"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          <Reveal>
            <div className="relative z-30 lg:max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
                Product
              </p>
              <h2 className="mt-5 font-display text-4xl font-light tracking-[-0.02em] text-zinc-50 md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                A wireless over-ear headphone built for spatial depth, silence,
                and sustained comfort.
              </h2>
              <p className="mt-8 max-w-lg text-base leading-[1.75] text-zinc-400 md:text-lg">
                Every curve is tuned for balance on the head. Every driver is
                voiced for clarity without fatigue. Aether One disappears when you
                listen—so the music can take the room it deserves.
              </p>
              <ul className="mt-10 space-y-4 border-l border-[color:var(--site-border-strong)] pl-6 text-sm text-zinc-500">
                <li className="text-zinc-300">
                  Three-dimensional spatial audio
                </li>
                <li>Adaptive silence that follows your environment</li>
                <li>Precision comfort for hours of critical listening</li>
              </ul>
            </div>
          </Reveal>

          <div className="relative z-10 min-h-0 min-w-0 lg:translate-x-8 xl:translate-x-12">
            <div
              className="absolute -inset-4 rounded-sm border bg-gradient-to-br to-transparent md:-inset-6"
              style={{
                borderColor: "var(--overview-deco-border)",
                backgroundImage:
                  "linear-gradient(to bottom right, var(--overview-deco-from), transparent)",
              }}
            />
            <div
              id="scroll-product-frame"
              className={`relative ${PRODUCT_CANVAS_BOX_CLASSNAME} overflow-hidden rounded-sm border bg-[var(--overview-frame-bg)] shadow-[inset_0_1px_0_var(--overview-frame-inset)]`}
              style={{ borderColor: "var(--site-border-medium)" }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
