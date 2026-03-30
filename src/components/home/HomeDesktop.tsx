"use client";

import { HomeProductScrollTrack } from "@/components/home/HomeProductScrollTrack";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BrandStatementSection } from "@/components/sections/BrandStatementSection";
import { DesignSection } from "@/components/sections/DesignSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { PurchaseSection } from "@/components/sections/PurchaseSection";
import { SoundSection } from "@/components/sections/SoundSection";
import { SpecsSection } from "@/components/sections/SpecsSection";

export function HomeDesktop() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeProductScrollTrack>
          <HeroSection />
          <OverviewSection />
        </HomeProductScrollTrack>
        <SoundSection />
        <DesignSection />
        <FeaturesSection />
        <SpecsSection />
        <PurchaseSection />
        <BrandStatementSection />
      </main>
      <SiteFooter />
    </>
  );
}

