"use client";

import { useRef, type ReactNode } from "react";
import { ScrollLinkedProductLayer } from "@/components/product/ScrollLinkedProductLayer";

export function HomeProductScrollTrack({
  children,
  stageQuality,
}: {
  children: ReactNode;
  stageQuality?: "auto" | "mobile";
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollLinkedProductLayer trackRef={trackRef} quality={stageQuality} />
      <div ref={trackRef} className="relative z-10">
        {children}
      </div>
    </>
  );
}
