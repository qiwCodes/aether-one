"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  RevealStagger,
  childReveal,
} from "@/components/ui/Reveal";

const panels = [
  {
    title: "Matte black finish",
    copy: "Soft-touch surfaces resist glare and fingerprints—a calm, uninterrupted silhouette.",
    span: "md:col-span-7",
  },
  {
    title: "Lightweight alloy",
    copy: "An internal frame tuned for flex and strength. Minimal mass, maximum poise.",
    span: "md:col-span-5",
  },
  {
    title: "Memory foam cushions",
    copy: "Slow-recovery foam and breathable textiles distribute pressure evenly.",
    span: "md:col-span-5",
  },
  {
    title: "Precision mesh",
    copy: "Micro-perforated grilles protect the acoustic path while reading as jewelry-grade metalwork.",
    span: "md:col-span-7",
  },
];

export function DesignSection() {
  return (
    <section
      id="craft"
      className="border-t border-[color:var(--site-border)] bg-[var(--section-design-bg)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
            Design & materials
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-light tracking-[-0.02em] text-zinc-50 md:text-5xl">
            Tactile hardware, quietly confident.
          </h2>
        </Reveal>

        <RevealStagger className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {panels.map((p) => (
            <motion.article
              key={p.title}
              variants={childReveal}
              className={`group relative overflow-hidden rounded-sm border bg-gradient-to-br to-transparent p-8 md:p-10 ${p.span}`}
              style={{
                borderColor: "var(--site-border-medium)",
                backgroundImage:
                  "linear-gradient(to bottom right, var(--design-panel-from), transparent)",
                boxShadow: "inset 0 1px 0 var(--design-panel-inset)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-700 group-hover:opacity-80"
                style={{ backgroundColor: "var(--design-panel-highlight)" }}
              />
              <div className="relative flex h-full min-h-[180px] flex-col justify-between md:min-h-[200px]">
                <div>
                  <h3 className="text-lg font-medium tracking-wide text-zinc-200 md:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-[1.85] text-zinc-500 md:text-[15px]">
                    {p.copy}
                  </p>
                </div>
                <div className="mt-8 h-px w-full max-w-[120px] bg-gradient-to-r from-zinc-500/50 to-transparent" />
              </div>
            </motion.article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
