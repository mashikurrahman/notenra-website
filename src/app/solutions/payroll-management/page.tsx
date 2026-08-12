"use client";

import { useState } from "react";
import { Calculator, Eye, ShieldCheck } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { PayrollHero } from "@/components/solutions/payroll-management/PayrollHero";
import { PayrollProcess } from "@/components/solutions/payroll-management/PayrollProcess";
import { PayrollBenefits } from "@/components/solutions/payroll-management/PayrollBenefits";
import { RvuCalculator } from "@/components/solutions/payroll-management/RvuCalculator";
import { PayrollWhyNotenra } from "@/components/solutions/payroll-management/PayrollWhyNotenra";
import { PayrollFaq } from "@/components/solutions/payroll-management/PayrollFaq";

export default function PayrollManagementPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      <PayrollHero onOpenDemo={handleOpenDemo} />
      <PayrollProcess />
      <PayrollBenefits />
      <RvuCalculator />
      <PayrollWhyNotenra />
      <PayrollFaq />
      <RelatedSolutions
        currentSlug="payroll-management"
        heading="Where the production data comes from."
        subheading="Compensation is only as trustworthy as the encounter record behind it."
      />
      {/* Payroll closes on the artefact this page sold: a statement the
          clinician can check themselves. */}
      <CtaSection
        onOpenDemo={handleOpenDemo}
        eyebrow="Payroll Management"
        headline="End the monthly argument"
        headlineAccent="about the number."
        subhead="Bring one clinician's compensation agreement to the demo and we will model a real period against it — thresholds, tiers, and all."
        primaryLabel="Book Your Demo"
        secondary={{
          label: "See the models supported",
          href: "#models",
          icon: Calculator,
        }}
        assurances={[
          { icon: Calculator, label: "Your agreements, not a template" },
          { icon: Eye, label: "Every line traceable to encounters" },
          { icon: ShieldCheck, label: "Role-based access & full audit trail" },
        ]}
      />

      <Footer />
      <LazyDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
