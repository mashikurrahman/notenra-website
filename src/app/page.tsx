"use client";

import { useState } from "react";
import { Stethoscope } from "lucide-react";
import { Header } from "@/components/header/Header";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsFloat } from "@/components/social-proof/StatsFloat";
import { SocialProof } from "@/components/social-proof/SocialProof";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { SpecialtiesSection } from "@/components/specialties/SpecialtiesSection";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { BentoGrid } from "@/components/bento-grid/BentoGrid";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />
      {/* Add the clinician cutout to /public, then pass it here:
          <HeroBanner ... imageSrc="/hero-clinician.png" /> */}
      <HeroBanner onOpenDemo={handleOpenDemo} />
      <StatsFloat />
      <HeroSection />
      <SocialProof />
      <FeatureGrid />
      <SpecialtiesSection tone="grey" />
      <BentoGrid />
      <HowItWorks />
      {/* Homepage closes on the platform-wide promise: time returned. */}
      <CtaSection
        onOpenDemo={handleOpenDemo}
        eyebrow="Start with one clinic"
        headline="Give your physicians"
        headlineAccent="their evenings back."
        subhead="Documentation, coding, and billing on one platform — so the charting that follows your clinicians home stops following them home."
        primaryLabel="Book Your Demo"
        secondary={{
          label: "Explore Specialties",
          href: "/about#specialties",
          icon: Stethoscope,
        }}
      />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
