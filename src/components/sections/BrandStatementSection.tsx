"use client";

import { motion } from "framer-motion";
import { PremiumLink } from "@/components/ui/PremiumButton";

export function BrandStatementSection() {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--site-border)] py-32 md:py-44">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--brand-radial)" }}
      />
      <div className="relative mx-auto max-w-[900px] px-6 text-center md:px-12">
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.45em] text-zinc-500"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Aether
        </motion.p>
        <motion.h2
          className="mt-10 font-display text-[clamp(2rem,5.5vw,3.5rem)] font-light leading-[1.12] tracking-[-0.02em] text-zinc-100"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          The future of listening is not louder—it is clearer, calmer, and
          closer to the source.
        </motion.h2>
        <motion.p
          className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Aether One is our statement on restraint: technology that recedes,
          sound that advances.
        </motion.p>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          <PremiumLink href="#purchase">Reserve yours</PremiumLink>
        </motion.div>
      </div>
    </section>
  );
}
