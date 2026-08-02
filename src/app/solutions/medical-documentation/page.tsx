"use client";

import { useState } from "react";
import { UserCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";
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
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      <DocHero onOpenDemo={handleOpenDemo} />
      <DocProcess />
      <DocBenefits />
      <DocTypes />
      <DocWhyNotenra />
      <DocFaq />
      <RelatedSolutions currentSlug="medical-documentation" />
      {/* Solution page closes on the specific artefact the page sold:
          a finished, reviewed note. */}
      <CtaSection
        onOpenDemo={handleOpenDemo}
        eyebrow="Medical Documentation"
        headline="Stop finishing notes"
        headlineAccent="after hours."
        subhead="See a real encounter turned into a reviewed, EHR-ready note in under a minute — using a visit from your own specialty."
        primaryLabel="See a Live Note Built"
        secondary={{
          label: "Read the review process",
          href: "#process",
          icon: UserCheck,
        }}
        assurances={[
          { icon: UserCheck, label: "Every note clinician-reviewed" },
          { icon: FileCheck2, label: "40+ EHRs supported" },
          { icon: ShieldCheck, label: "HIPAA compliant & BAA included" },
        ]}
      />

      <Footer />
      <LazyDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
