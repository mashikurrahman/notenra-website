"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ComparisonSection } from "@/components/comparison/ComparisonSection";
import { SpecialtiesSection } from "@/components/specialties/SpecialtiesSection";
import { BentoGrid } from "@/components/bento-grid/BentoGrid";
import { SecuritySection } from "@/components/security/SecuritySection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";

export default function AboutPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#1B3F60]">
      <Header onOpenDemo={handleOpenDemo} />

      {/* Intro */}
      <section className="pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            About NOTENRA
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Built by clinicians and engineers who believe physicians should spend their time with patients,
            not paperwork. NOTENRA pairs ambient AI with certified human reviewers so every note is fast,
            accurate, and trustworthy.
          </p>
        </div>
      </section>

      <ComparisonSection />
      <SpecialtiesSection />
      <BentoGrid />
      <SecuritySection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection onOpenDemo={handleOpenDemo} />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
