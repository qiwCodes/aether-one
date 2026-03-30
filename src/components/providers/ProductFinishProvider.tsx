"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import type { ProductFinishId } from "@/components/product/productFinish";

type Ctx = { finish: ProductFinishId; setFinish: (id: ProductFinishId) => void };

const ProductFinishContext = createContext<Ctx | null>(null);

function syncSiteTheme(finish: ProductFinishId) {
  document.documentElement.dataset.siteTheme =
    finish === "ivory_gilt" ? "light" : "dark";
}

export function ProductFinishProvider({ children }: { children: ReactNode }) {
  const [finish, setFinishState] = useState<ProductFinishId>("obsidian");

  useEffect(() => {
    syncSiteTheme(finish);
  }, [finish]);

  const setFinish = useCallback((id: ProductFinishId) => {
    const apply = () => {
      syncSiteTheme(id);
      flushSync(() => setFinishState(id));
    };

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      return;
    }

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => ViewTransition;
    };
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  const value = useMemo(() => ({ finish, setFinish }), [finish, setFinish]);

  return (
    <ProductFinishContext.Provider value={value}>
      {children}
    </ProductFinishContext.Provider>
  );
}

export function useProductFinish() {
  const ctx = useContext(ProductFinishContext);
  if (!ctx) {
    throw new Error("useProductFinish must be used within ProductFinishProvider");
  }
  return ctx;
}
