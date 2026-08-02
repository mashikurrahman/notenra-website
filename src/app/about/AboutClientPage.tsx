"use client";

import { useState } from "react";
import { ShieldCheck, UserCheck, FileCheck2, Clock } from "lucide-react";
import { Header } from "@/components/header/Header";
import { ComparisonSection } from "@/components/comparison/ComparisonSection";
import { SpecialtiesSection } from "@/components/specialties/SpecialtiesSection";
import { BentoGrid } from "@/components/bento-grid/BentoGrid";
import { SecuritySection } from "@/components/security/SecuritySection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";

export function AboutClientPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      {/* Intro */}
      <section className="pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
            About NOTENRA
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Built by clinicians and engineers who believe physicians should
            spend their time with patients, not paperwork. NOTENRA pairs ambient
            AI with certified human reviewers so every note is fast, accurate,
            and trustworthy.
          </p>
        </div>
      </section>

      <ComparisonSection />
      <SpecialtiesSection tone="white" />
      <BentoGrid tone="grey" />
      <SecuritySection />
      <TestimonialsSection />
      <FaqSection />
      
      <CtaSection
        tone="grey"
        onOpenDemo={handleOpenDemo}
        eyebrow="Talk to the team"
        headline="See whether we're"
        headlineAccent="the right fit."
        subhead="Bring us your specialty mix, your EHR, and your worst documentation bottleneck. We will show you exactly how NOTENRA handles it — no slideware."
        primaryLabel="Talk to Our Team"
        secondary={{
          label: "Review our security posture",
          href: "/security",
          icon: ShieldCheck,
        }}
        assurances={[
          { icon: UserCheck, label: "Clinician-led onboarding" },
          { icon: FileCheck2, label: "BAA signed before pilot" },
          { icon: Clock, label: "No long-term contracts" },
        ]}
      />
      <Footer />
      <LazyDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
