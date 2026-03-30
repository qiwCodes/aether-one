"use client";

import { motion } from "framer-motion";
import { Reveal, RevealStagger, childReveal } from "@/components/ui/Reveal";

const specs = [
  { label: "Battery life", value: "Up to 40 hours ANC on" },
  { label: "Fast charge", value: "6 hours from 10 minutes" },
  { label: "Connectivity", value: "Bluetooth 5.3 · multipoint" },
  { label: "Drivers", value: "40 mm beryllium-composite" },
  { label: "Weight", value: "268 g" },
  { label: "Materials", value: "Aluminum · steel · protein leather" },
  { label: "Frequency response", value: "4 Hz – 40 kHz" },
  { label: "Codecs", value: "LC3 · aptX Adaptive · AAC" },
];

export function SpecsSection() {
  return (
    <section
      id="specs"
      className="border-t border-[color:var(--site-border)] bg-[var(--section-specs-bg)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
              Specifications
            </p>
            <h2 className="mt-6 font-display text-4xl font-light tracking-[-0.02em] text-zinc-50 md:text-[2.75rem] md:leading-[1.1]">
              Technical sheet, distilled.
            </h2>
            <p className="mt-6 text-sm leading-[1.85] text-zinc-500">
              Numbers matter when they translate to silence you can trust and
              detail you can feel. Every metric here is measured under Aether
              reference conditions.
            </p>
          </Reveal>

          <RevealStagger
            className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border sm:grid-cols-2 lg:col-span-8"
            style={{
              borderColor: "var(--specs-grid-border)",
              backgroundColor: "var(--specs-grid-gap)",
            }}
          >
            {specs.map((s) => (
              <motion.div
                key={s.label}
                variants={childReveal}
                className="flex flex-col justify-center bg-[var(--section-feature-card)] px-8 py-7 md:px-10 md:py-8"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-600">
                  {s.label}
                </span>
                <span className="mt-3 font-display text-xl font-light text-zinc-100 md:text-2xl">
                  {s.value}
                </span>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
