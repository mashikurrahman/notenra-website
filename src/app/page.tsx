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
import { EhrCompatibility } from "@/components/solutions/EhrCompatibility";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { Footer } from "@/components/footer/Footer";
import { DemoProvider } from "@/components/demo-modal/DemoProvider";
import { VisionSection } from "@/components/vision/VisionSection";
import { MottoSection } from "@/components/motto/MottoSection";

/* Note the absence of "use client". This page used to carry it solely to hold
   the demo modal's useState, and that one hook pulled every section below it
   into the client bundle. The state now lives in <DemoProvider>, so sections
   that are pure markup render to HTML and ship no component JS at all. */
export default function Home() {
  return (
    <DemoProvider>
      <main className="min-h-screen flex flex-col bg-white text-brand-ink">
        <Header />
        <Hero />
        <ProblemSection />
        <SocialProof />
        <FeatureGrid />
        <VisionSection />
        <AiSection />
        <SpecialtiesSection tone="grey" />
        <BentoGrid />
        <EhrCompatibility />
        <HowItWorks />
        <SecuritySection />
        <MottoSection />
        {/* Homepage closes on the platform-wide promise: time returned. */}
        <CtaSection
          tone="white"
          eyebrow="Start with one clinic"
          headline="Give your physicians"
          headlineAccent="their evenings back."
          subhead="Documentation, coding, and billing on one platform — so the charting that follows your clinicians home stops following them home."
          primaryLabel="Book Your Demo"
          /* `secondary` is omitted deliberately: CtaSection's default is
             already "Explore Specialties" → /about#specialties with the
             stethoscope icon, and a lucide component cannot be passed from a
             server component to a client one — React can't serialise a
             function across that boundary. */
        />
        <Footer />
      </main>
    </DemoProvider>
  );
}
