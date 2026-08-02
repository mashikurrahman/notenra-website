"use client";

import { useState } from "react";
import { FileCheck2, ShieldCheck, UserCheck } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { CodingHero } from "@/components/solutions/medical-coding/CodingHero";
import { CodingWorkflow } from "@/components/solutions/medical-coding/CodingWorkflow";
import { CodingBenefits } from "@/components/solutions/medical-coding/CodingBenefits";
import { CodeSets } from "@/components/solutions/medical-coding/CodeSets";
import { QualityAssurance } from "@/components/solutions/medical-coding/QualityAssurance";
import { CodingFaq } from "@/components/solutions/medical-coding/CodingFaq";

export default function MedicalCodingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={() => setIsDemoModalOpen(true)} />
      <CodingHero onOpenDemo={() => setIsDemoModalOpen(true)} />
      <CodingWorkflow />
      <CodingBenefits />
      <CodeSets />
      <QualityAssurance />
      <CodingFaq />
      <RelatedSolutions
        currentSlug="medical-coding"
        heading="More ways to strengthen the clinical record."
        subheading="Coding is more reliable when documentation, billing, and every downstream workflow share the same source of truth."
      />
      <CtaSection
        onOpenDemo={() => setIsDemoModalOpen(true)}
        eyebrow="Medical Coding"
        headline="Make every claim"
        headlineAccent="easier to trust."
        subhead="See how human-reviewed coding turns clinical context into a compliant, claim-ready package for your revenue cycle team."
        primaryLabel="See a Live Coding Review"
        secondary={{ label: "Explore the workflow", href: "#workflow", icon: UserCheck }}
        assurances={[
          { icon: UserCheck, label: "Human-reviewed quality" },
          { icon: FileCheck2, label: "ICD-10, CPT & HCPCS" },
          { icon: ShieldCheck, label: "Compliance and audit readiness" },
        ]}
        tone="grey"
      />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </main>
  );
}
