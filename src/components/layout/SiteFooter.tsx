import Link from "next/link";

const social = ["Instagram", "X", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--site-border)] bg-[var(--footer-bg)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-12 md:py-20">
        <div>
          <p className="font-display text-2xl text-zinc-100">Aether</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            Precision audio instruments. California designed.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-[12px] uppercase tracking-[0.18em] text-zinc-500">
          <Link href="#" className="transition-colors hover:text-zinc-300">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-zinc-300">
            Terms
          </Link>
          <Link href="#" className="transition-colors hover:text-zinc-300">
            Support
          </Link>
          <Link href="#" className="transition-colors hover:text-zinc-300">
            Press
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-zinc-600">
            {social.map((s) => (
              <span key={s} className="cursor-default">
                {s}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Aether Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
