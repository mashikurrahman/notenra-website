"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { DocHero } from "@/components/solutions/medical-documentation/DocHero";
import { DocProcess } from "@/components/solutions/medical-documentation/DocProcess";
import { DocBenefits } from "@/components/solutions/medical-documentation/DocBenefits";
import { DocTypes } from "@/components/solutions/medical-documentation/DocTypes";
import { DocWhyNotenra } from "@/components/solutions/medical-documentation/DocWhyNotenra";
import { DocFaq } from "@/components/solutions/medical-documentation/DocFaq";

export default function MedicalDocumentationPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#1B3F60]">
      <Header onOpenDemo={handleOpenDemo} />

      <DocHero onOpenDemo={handleOpenDemo} />
      <DocProcess />
      <DocBenefits />
      <DocTypes />
      <DocWhyNotenra />
      <DocFaq />
      <RelatedSolutions currentSlug="medical-documentation" />
      <CtaSection onOpenDemo={handleOpenDemo} />

      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
