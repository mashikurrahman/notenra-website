"use client";

import { useState } from "react";
import { SearchCheck, ShieldCheck, LineChart } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { BillingHero } from "@/components/solutions/medical-billing/BillingHero";
import { BillingProcess } from "@/components/solutions/medical-billing/BillingProcess";
import { BillingBenefits } from "@/components/solutions/medical-billing/BillingBenefits";
import { BillingServices } from "@/components/solutions/medical-billing/BillingServices";
import { BillingWhyNotenra } from "@/components/solutions/medical-billing/BillingWhyNotenra";
import { BillingFaq } from "@/components/solutions/medical-billing/BillingFaq";

export default function MedicalBillingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      <BillingHero onOpenDemo={handleOpenDemo} />
      <BillingProcess />
      <BillingBenefits />
      <BillingServices />
      <BillingWhyNotenra />
      <BillingFaq />
      <RelatedSolutions
        currentSlug="medical-billing"
        heading="The layers that feed a clean claim."
        subheading="Billing is strongest when the codes reaching it were already verified against the clinical record."
      />
      {/* Billing closes on the specific artefact this page sold:
          a claim that goes out clean the first time. */}
      <CtaSection
        onOpenDemo={handleOpenDemo}
        eyebrow="Medical Billing"
        headline="Stop working denials"
        headlineAccent="you could have prevented."
        subhead="Bring a recent batch of denied claims to the demo and we will show you which ones the pre-submission scrub would have caught."
        primaryLabel="Book Your Demo"
        secondary={{
          label: "See the claim lifecycle",
          href: "#lifecycle",
          icon: SearchCheck,
        }}
        assurances={[
          { icon: SearchCheck, label: "Every claim scrubbed pre-submission" },
          { icon: LineChart, label: "Per-claim visibility, not monthly reports" },
          { icon: ShieldCheck, label: "HIPAA compliant & BAA included" },
        ]}
      />

      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
