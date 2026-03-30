"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HomeProductScrollTrack } from "@/components/home/HomeProductScrollTrack";
import { PRODUCT_FINISHES } from "@/components/product/productFinish";
import { PRODUCT_CANVAS_BOX_CLASSNAME } from "@/components/product/productCanvasBox";
import { useProductFinish } from "@/components/providers/ProductFinishProvider";
import { BrandStatementSection } from "@/components/sections/BrandStatementSection";
import { DesignSection } from "@/components/sections/DesignSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PurchaseSection } from "@/components/sections/PurchaseSection";
import { SoundSection } from "@/components/sections/SoundSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { PremiumLink } from "@/components/ui/PremiumButton";

const finishSwatchClass: Record<
  (typeof PRODUCT_FINISHES)[number]["id"],
  string
> = {
  obsidian:
    "border-[#2a2a2e] bg-[radial-gradient(circle_at_30%_25%,#3a3a40_0%,#141416_65%)]",
  ivory_gilt:
    "border-[#c9a862]/50 bg-[linear-gradient(145deg,#faf6ef_0%,#e8dfd0_45%,#f0e8dc_100%)]",
};

function MobileHero() {
  const { finish, setFinish } = useProductFinish();

  return (
    <section
      id="hero"
      className="relative isolate w-full overflow-hidden pt-[5.75rem]"
    >
      {/* Backdrop layers (match desktop variables, simpler layout). */}
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

      <div className="relative z-10 mx-auto max-w-[720px] px-5 pb-16">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.42em]"
          style={{ color: "var(--site-label-warm)" }}
        >
          Wireless · Over-ear · Flagship
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,11vw,4rem)] font-light leading-[0.92] tracking-[-0.03em] text-zinc-50">
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
        <p className="mt-5 max-w-prose text-[15px] leading-[1.75] text-zinc-400">
          Engineered for silence you can wear. Spatial depth without theatrics.
        </p>

        <div className="mt-9">
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
            className="mt-3 grid grid-cols-1 gap-2"
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
                  className={`flex min-h-[48px] items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors duration-300 ${
                    active
                      ? "border-[#c9a862]/35 bg-[var(--finish-active-bg)] text-zinc-100 shadow-[inset_0_0_0_1px_rgba(201,168,98,0.12)]"
                      : "border-[color:var(--site-border-medium)] bg-transparent text-zinc-500"
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

        <div className="mt-8">
          <div
            id="scroll-product-hero-anchor"
            className={`relative rounded-sm border border-[color:var(--site-border-medium)] bg-[rgba(0,0,0,0.08)] ${PRODUCT_CANVAS_BOX_CLASSNAME}`}
            aria-hidden
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}

function MobileOverview() {
  return (
    <section
      id="overview"
      className="border-t border-[color:var(--site-border)] py-20"
    >
      <div className="mx-auto max-w-[720px] px-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
          Product
        </p>
        <h2 className="mt-5 font-display text-3xl font-light tracking-[-0.02em] text-zinc-50">
          Spatial depth, silence, sustained comfort.
        </h2>
        <p className="mt-6 text-[15px] leading-[1.85] text-zinc-400">
          Every curve is tuned for balance on the head. Every driver is voiced
          for clarity without fatigue. Aether One disappears when you
          listen—so the music can take the room it deserves.
        </p>
        <ul className="mt-8 space-y-3 border-l border-[color:var(--site-border-strong)] pl-5 text-[13px] text-zinc-500">
          <li className="text-zinc-300">Three-dimensional spatial audio</li>
          <li>Adaptive silence that follows your environment</li>
          <li>Precision comfort for hours of critical listening</li>
        </ul>

        <div className="mt-12">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-sm border bg-gradient-to-br to-transparent"
              style={{
                borderColor: "var(--overview-deco-border)",
                backgroundImage:
                  "linear-gradient(to bottom right, var(--overview-deco-from), transparent)",
              }}
              aria-hidden
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

export function HomeMobile() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeProductScrollTrack stageQuality="mobile">
          <MobileHero />
          <MobileOverview />
        </HomeProductScrollTrack>
        <SoundSection />
        <DesignSection />
        <FeaturesSection />
        <SpecsSection />
        <PurchaseSection />
        <BrandStatementSection />
      </main>
      <SiteFooter />
    </>
  );
}

