"use client";

import { useState } from "react";
import { Stethoscope } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { SocialProof } from "@/components/social-proof/SocialProof";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { AiSection } from "@/components/ai-section/AiSection";
import { SpecialtiesSection } from "@/components/specialties/SpecialtiesSection";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { SecuritySection } from "@/components/security/SecuritySection";
import { BentoGrid } from "@/components/bento-grid/BentoGrid";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";
import { VisionSection } from "@/components/vision/VisionSection";
import { MottoSection } from "@/components/motto/MottoSection";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />
      <Hero onOpenDemo={handleOpenDemo} />
      <ProblemSection />
      <SocialProof />
      <FeatureGrid />
      <VisionSection />
      <AiSection />
      <SpecialtiesSection tone="grey" />
      <BentoGrid />
      <HowItWorks />
      <SecuritySection />
      <MottoSection />
      {/* Homepage closes on the platform-wide promise: time returned. */}
      <CtaSection
        tone="white"
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
