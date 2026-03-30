"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PRODUCT_FINISHES } from "@/components/product/productFinish";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Reveal } from "@/components/ui/Reveal";
import { useProductFinish } from "@/components/providers/ProductFinishProvider";

export function PurchaseSection() {
  const { finish, setFinish } = useProductFinish();
  const [qty, setQty] = useState(1);

  return (
    <section
      id="purchase"
      className="border-t border-[color:var(--site-border)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <div
            className="mx-auto max-w-2xl border bg-gradient-to-b to-transparent px-8 py-12 md:px-14 md:py-16"
            style={{
              borderColor: "var(--purchase-card-border)",
              backgroundImage:
                "linear-gradient(to bottom, var(--purchase-card-from), transparent)",
              boxShadow: "inset 0 1px 0 var(--purchase-card-inset)",
            }}
          >
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500">
              Aether One
            </p>
            <h2 className="mt-4 text-center font-display text-4xl font-light text-zinc-50 md:text-5xl">
              $499
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-zinc-500">
              Wireless over-ear · spatial audio · adaptive ANC · included
              travel case
            </p>

            <div className="mt-12">
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-600">
                Finish
              </span>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PRODUCT_FINISHES.map((f) => {
                  const active = finish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id)}
                      className={`w-full min-h-[60px] border px-5 py-4 text-left transition-all duration-300 ${
                        active
                          ? "border-[color:var(--site-border-finish-active)] bg-[var(--finish-active-bg)] text-zinc-100"
                          : "border-[color:var(--site-border-medium)] text-zinc-500 hover:border-[color:var(--site-border-finish)] hover:text-zinc-300"
                      }`}
                    >
                      <span className="block text-sm font-medium tracking-wide">
                        {f.name}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-zinc-600">
                        {f.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-8 border-t border-[color:var(--site-border-medium)] pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-600">
                  Quantity
                </span>
                <div className="mt-4 flex w-full justify-center md:justify-start">
                  <div className="grid w-full grid-cols-[1fr_auto_1fr] items-stretch border border-[color:var(--site-border-strong)] md:w-auto">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="px-4 py-3 text-zinc-400 transition-colors hover:bg-[var(--purchase-qty-hover)] hover:text-zinc-100"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="flex min-w-[2.5rem] items-center justify-center px-4 text-center text-sm leading-none tabular-nums text-zinc-200">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="px-4 py-3 text-zinc-400 transition-colors hover:bg-[var(--purchase-qty-hover)] hover:text-zinc-100"
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <PremiumButton
                variant="solid"
                className="w-full px-10 py-4 text-[12px] md:w-auto"
                onClick={() => {}}
              >
                Pre-order Now
              </PremiumButton>
            </div>

            <motion.ul
              className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3 border-t border-[color:var(--site-border)] pt-10 text-center text-[11px] uppercase tracking-[0.18em] text-zinc-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <li>Complimentary shipping</li>
              <li>2-year warranty</li>
              <li>30-day listening trial</li>
            </motion.ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
