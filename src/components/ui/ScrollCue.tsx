"use client";

import { motion } from "framer-motion";

export function ScrollCue() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      aria-hidden
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">
        Scroll
      </span>
      <div
        className="flex h-12 w-[1px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--scroll-cue-line), transparent)`,
        }}
      >
        <motion.div
          className="h-4 w-full"
          style={{ backgroundColor: "var(--scroll-cue-dot)" }}
          animate={{ y: [0, 36, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
      </div>
    </motion.div>
  );
}
