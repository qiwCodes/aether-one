"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { type ReactNode, useCallback, useRef } from "react";

const spring = { stiffness: 380, damping: 32, mass: 0.35 };

type Common = {
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
};

function MagneticWrap({
  children,
  magnetic,
  className,
}: {
  children: ReactNode;
  magnetic: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0)`;

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!magnetic || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
      y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
    },
    [magnetic, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export function PremiumLink({
  href,
  children,
  className = "",
  magnetic = true,
  variant = "solid",
}: Common & {
  href: string;
  variant?: "solid" | "ghost";
}) {
  const base =
    variant === "solid"
      ? "border border-[color:var(--premium-border)] bg-[var(--premium-bg)] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-100 shadow-[inset_0_1px_0_var(--premium-inset)] backdrop-blur-sm transition-colors hover:border-[color:var(--premium-hover-border)] hover:bg-[var(--premium-hover-bg)]"
      : "border border-[color:var(--premium-ghost-border)] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-300 transition-colors hover:border-[color:var(--premium-ghost-hover-border)] hover:text-[var(--foreground)]";

  return (
    <Link
      href={href}
      className="inline-flex outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
    >
      <MagneticWrap
        magnetic={magnetic}
        className={`inline-flex items-center justify-center ${base} ${className}`}
      >
        {children}
      </MagneticWrap>
    </Link>
  );
}

export function PremiumButton({
  children,
  onClick,
  className = "",
  magnetic = true,
  variant = "solid",
  type = "button",
}: Common & {
  onClick?: () => void;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
}) {
  const base =
    variant === "solid"
      ? "border border-[color:var(--premium-border)] bg-[var(--premium-bg)] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-100 shadow-[inset_0_1px_0_var(--premium-inset)] backdrop-blur-sm transition-colors hover:border-[color:var(--premium-hover-border)] hover:bg-[var(--premium-hover-bg)]"
      : "border border-[color:var(--premium-ghost-border)] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-300 transition-colors hover:border-[color:var(--premium-ghost-hover-border)] hover:text-[var(--foreground)]";

  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
    >
      <MagneticWrap
        magnetic={magnetic}
        className={`inline-flex items-center justify-center ${base} ${className}`}
      >
        {children}
      </MagneticWrap>
    </button>
  );
}
