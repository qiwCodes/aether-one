"use client";

import { motion } from "framer-motion";
import { Reveal, RevealStagger, childReveal } from "@/components/ui/Reveal";

/** Module-level geometry so SSR and client match; avoid motion.rect on animated layout attrs (hydration). */
const WAVE_BAR_COUNT = 48;
const WAVE_BARS: { x: string; y: string; h: string }[] = (() => {
  const out: { x: string; y: string; h: string }[] = [];
  for (let i = 0; i < WAVE_BAR_COUNT; i++) {
    const hRaw = 14 + Math.sin(i * 0.38) * 20 + (i % 5) * 3;
    const h = Math.max(2, hRaw);
    const x = (i / WAVE_BAR_COUNT) * 472 + 4;
    const y = 60 - h / 2;
    out.push({
      x: x.toFixed(2),
      y: y.toFixed(2),
      h: h.toFixed(2),
    });
  }
  return out;
})();

function Waveform() {
  return (
    <svg
      viewBox="0 0 480 120"
      className="h-24 w-full max-w-2xl text-zinc-600 md:h-32"
      aria-hidden
    >
      <defs>
        <linearGradient id="wf" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {WAVE_BARS.map((bar, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0.22 }}
          animate={{
            opacity: [0.18, 0.48, 0.28, 0.42, 0.18],
          }}
          transition={{
            duration: 4.2 + (i % 9) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.035,
          }}
        >
          <rect
            x={bar.x}
            y={bar.y}
            width={3}
            height={bar.h}
            rx={1}
            fill="url(#wf)"
          />
        </motion.g>
      ))}
    </svg>
  );
}

export function SoundSection() {
  return (
    <section
      id="sound"
      className="relative overflow-hidden border-t border-[color:var(--site-border)] py-28 md:py-40"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, var(--sound-line), transparent)`,
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
            Sound
          </p>
        </Reveal>

        <motion.h2
          className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,7vw,4.75rem)] font-light leading-[1.02] tracking-[-0.03em] text-zinc-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Hear the room
          <span className="block text-zinc-500">inside the sound.</span>
        </motion.h2>

        <div className="mt-14 flex justify-center md:mt-20 md:justify-start">
          <Waveform />
        </div>

        <RevealStagger className="mt-20 grid gap-12 border-t border-[color:var(--site-border)] pt-16 md:grid-cols-3 md:gap-10">
          <motion.div variants={childReveal}>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
              Spatial audio
            </h3>
            <p className="mt-4 text-sm leading-[1.8] text-zinc-500 md:text-[15px]">
              Binaural rendering places instruments in believable space—close,
              distant, and precisely anchored.
            </p>
          </motion.div>
          <motion.div variants={childReveal}>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
              Adaptive silence
            </h3>
            <p className="mt-4 text-sm leading-[1.8] text-zinc-500 md:text-[15px]">
              Cancellation that breathes with your surroundings, preserving
              nuance when the world gets quiet.
            </p>
          </motion.div>
          <motion.div variants={childReveal}>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
              Acoustic clarity
            </h3>
            <p className="mt-4 text-sm leading-[1.8] text-zinc-500 md:text-[15px]">
              Low distortion drivers reveal micro-detail and decay—the air
              around each note.
            </p>
          </motion.div>
        </RevealStagger>
      </div>
    </section>
  );
}
