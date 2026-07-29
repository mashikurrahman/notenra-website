"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { HeroSection } from "@/components/hero/HeroSection";
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
    <main className="min-h-screen flex flex-col bg-white text-[#1B3F60]">
      <Header onOpenDemo={handleOpenDemo} />
      <HeroSection onOpenDemo={handleOpenDemo} />
      <SocialProof />
      <FeatureGrid />
      <SpecialtiesSection />
      <BentoGrid />
      <HowItWorks />
      <CtaSection onOpenDemo={handleOpenDemo} />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
