"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomeDesktop = dynamic(() => import("./HomeDesktop").then((m) => m.HomeDesktop), {
  ssr: false,
});

const HomeMobile = dynamic(() => import("./HomeMobile").then((m) => m.HomeMobile), {
  ssr: false,
});

function getIsDesktop() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

export function ResponsiveHome() {
  /**
   * Default to mobile on first paint to avoid hydration mismatch and to ensure
   * desktop-only 3D/scroll-linked code is not eagerly loaded on small devices.
   */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  if (isDesktop || getIsDesktop()) return <HomeDesktop />;
  return <HomeMobile />;
}

