"use client";

import { motion } from "framer-motion";
import { RevealStagger, childReveal } from "@/components/ui/Reveal";

const features = [
  {
    title: "Spatial Audio",
    desc: "Pinpoint imaging and depth that extends beyond the ear cups.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="16"
          cy="16"
          r="11"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M16 5v3M16 24v3M5 16h3M24 16h3"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    title: "Adaptive Silence",
    desc: "Noise cancellation that modulates with motion, voice, and ambience.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
        <path
          d="M6 18h6l2 4h10l2-4h4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M10 14c2-4 10-4 12 0"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
      </svg>
    ),
  },
  {
    title: "All-Day Comfort",
    desc: "Clamping force calibrated for long sessions without hot spots.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
        <path
          d="M8 20c0-5 3.5-9 8-9s8 4 8 9"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M6 22h20"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    title: "Precision Battery System",
    desc: "40 hours playback, fast charge, and cell health management built in.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden>
        <rect
          x="10"
          y="8"
          width="14"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M13 12h6M13 16h6M13 20h4"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-t border-[color:var(--site-border)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
          Features
        </p>
        <h2 className="mt-5 font-display text-4xl font-light tracking-[-0.02em] text-zinc-50 md:text-5xl">
          Engineered for immersion.
        </h2>

        <RevealStagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((f) => (
            <motion.article
              key={f.title}
              variants={childReveal}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-sm border border-[color:var(--site-border-medium)] bg-[var(--section-feature-card)] p-9 shadow-[inset_0_1px_0_var(--overview-frame-inset)] md:p-10"
            >
              <div className="flex items-start gap-8">
                <div className="text-zinc-500 transition-colors duration-500 group-hover:text-zinc-300">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-wide text-zinc-200">
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-[1.8] text-zinc-500">
                    {f.desc}
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-zinc-400 to-transparent transition-all duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
