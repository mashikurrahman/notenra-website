import type { Metadata } from "next";
import { PricingClientPage } from "./PricingClientPage";

export const metadata: Metadata = {
  title: "Medical Documentation, Coding & Billing Pricing | NOTENRA",
  description: "Find the right documentation workflow for your practice. Explore pricing for AI Documentation, Hybrid Documentation, and custom enterprise integrations.",
  alternates: {
    canonical: "https://notenra.com/pricing",
  },
  openGraph: {
    title: "Medical Documentation, Coding & Billing Pricing | NOTENRA",
    description: "Find the right documentation workflow for your practice. Explore pricing for AI Documentation, Hybrid Documentation, and custom enterprise integrations.",
    url: "https://notenra.com/pricing",
    type: "website",
  },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://notenra.com/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pricing",
      "item": "https://notenra.com/pricing",
    },
  ],
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NOTENRA",
  "url": "https://notenra.com",
  "logo": "https://notenra.com/icon.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "billing help desk",
    "email": "hello@notenra.com",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which documentation solution is right for my practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you are a solo practitioner seeking a fast, self-service drafting tool, the AI Documentation plan is ideal. If you run a growing clinic and want documentation pre-vetted by trained medical specialists before export, choose the Hybrid plan. For larger groups with custom EHR configurations and specific templates, select our Enterprise custom solution.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I upgrade, downgrade, or switch plans later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can adjust your tier at any time directly through your dashboard. Plan modifications take effect on your next billing cycle. If you transition to a Hybrid or Custom plan, our customer success team will assist with onboarding your specialists.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens if I exceed my monthly note limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Additional notes on the AI and Hybrid plans are billed at a flexible volume-based rate. We will alert you when you reach 80% and 100% of your tier limit so you can adjust your configuration if necessary.",
      },
    },
    {
      "@type": "Question",
      "name": "Can Medical Coding be purchased as a standalone service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our professional CPT and ICD-10 coding service is available independently. You do not need to use NOTENRA documentation workflows to utilize our certified coding audits and queue submissions.",
      },
    },
    {
      "@type": "Question",
      "name": "Can Medical Billing be purchased as a standalone service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. End-to-end revenue cycle and claims management services can be purchased independently to optimize reimbursement workflows for your current billing team.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I combine Documentation, Coding, and Billing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Combining all three provides a fully integrated clinical pipeline, automatically moving ambient consultation notes through human-vetted coding audits directly to claim submissions, maximizing efficiency.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you support custom clinical workflows?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. For our Custom Enterprise tier, our engineers write tailored integrations, custom templates, and FHIR data maps matching your organization's exact documentation preferences.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you sign a Business Associate Agreement (BAA)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NOTENRA executes a standard BAA with every practice group before any audio processing or EHR data sync occurs, guaranteeing HIPAA-aligned safeguards.",
      },
    },
    {
      "@type": "Question",
      "name": "How are backups and clinical data secured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All records are encrypted at rest with AES-256 keys and in transit with TLS 1.3. Incremental daily backups are partitioned across multiple secure AWS availability zones.",
      },
    },
    {
      "@type": "Question",
      "name": "Is there a setup or onboarding fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard AI tiers require zero setup fees. Hybrid and Custom plans include a dedicated onboarding phase to configure templates, align specialists, and map EHR fields, covered under your custom kickoff structure.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <PricingClientPage />
    </>
  );
}
