import type { Metadata } from "next";
import { SecurityClientPage } from "./SecurityClientPage";

export const metadata: Metadata = {
  title: "Healthcare Data Security & HIPAA Compliance | NOTENRA",
  description: "Learn how NOTENRA protects Protected Health Information (PHI) with AES-256 encryption, SOC 2 Type II compliance, role-based controls, and a privacy-first AI architecture.",
  alternates: {
    canonical: "https://notenra.com/security",
  },
  openGraph: {
    title: "Healthcare Data Security & HIPAA Compliance | NOTENRA",
    description: "Learn how NOTENRA protects Protected Health Information (PHI) with AES-256 encryption, SOC 2 Type II compliance, role-based controls, and a privacy-first AI architecture.",
    url: "https://notenra.com/security",
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
      "name": "Security",
      "item": "https://notenra.com/security",
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
    "contactType": "security desk",
    "email": "security@notenra.com",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is patient information protected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All patient information is processed within isolated, HIPAA-compliant Virtual Private Clouds (VPCs). Audio data is streamed securely via encrypted TLS 1.3 tunnels, processed transiently in memory, and immediately purged once clinical notes are successfully compiled.",
      },
    },
    {
      "@type": "Question",
      "name": "Is my clinical data encrypted at rest and in transit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All data is encrypted in transit using industry-standard TLS 1.3 (with secure SHA-256 signatures) and at rest using bank-grade AES-256 bit encryption keys managed through secure cloud hardware security modules (HSMs).",
      },
    },
    {
      "@type": "Question",
      "name": "How do you control internal user access?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We implement a strict Zero Trust architecture. Internal systems require multi-factor authentication (MFA) and hardware security tokens. Employee access to operational pipelines is governed by Role-Based Access Control (RBAC) and the Principle of Least Privilege.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I manage user permissions in my clinic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our platform includes an enterprise Permission Matrix allowing clinic administrators to customize access levels. You can restrict staff roles to read-only clinical notes, biller access, developer API credentials, or full administration rights.",
      },
    },
    {
      "@type": "Question",
      "name": "How are data backups handled?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We perform automated, daily incremental backups of clinical configurations and system logs. Backups are encrypted with unique AES-256 keys and replicated across multiple geographically separated regions to guarantee disaster recovery readiness.",
      },
    },
    {
      "@type": "Question",
      "name": "How is documentation secured when synced to our EHR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Syncing occurs over authenticated, direct FHIR or HL7 API pipelines. We utilize secure OAuth 2.0 authorization codes and custom credentials, ensuring that data is safely written directly to your EHR patient chart without middle-man caching.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you train AI models on my data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely not. NOTENRA does not train public foundation models, third-party neural networks, or shared language systems on your clinical transcripts or Protected Health Information (PHI).",
      },
    },
    {
      "@type": "Question",
      "name": "Who reviews the clinical documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depending on your selected workflow (AI-only or Hybrid), clinical documents can be routed to credentialed, HIPAA-trained clinical documentation improvement (CDI) specialists for manual validation before final signature.",
      },
    },
  ],
};

export default function SecurityPage() {
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
      <SecurityClientPage />
    </>
  );
}
