import { Metadata } from "next";

export const siteConfig = {
  name: "NOTENRA",
  legalName: "Notenra Medical Intelligence, Inc.",
  description:
    "AI-powered clinical documentation, coding, and billing workflows, refined by healthcare experts, so physicians can focus on patients instead of paperwork.",
  url: "https://notenra.com",
  ogImage: "https://notenra.com/og-image.png",
  twitterHandle: "@notenra_health",
  logo: "https://notenra.com/notenra-logo.svg",
  themeColor: "#16456A",
  brandNavy: "#0A2B4B",
  primaryCyan: "#0E7C93",
  accentCyan: "#4ACCCE",
};

export function buildMetadata(): Metadata {
  return {
    title: {
      default: "NOTENRA - Documentation That Moves at the Speed of Care",
      template: "%s | NOTENRA",
    },
    description: siteConfig.description,
    keywords: [
      "AI Medical Scribe",
      "Clinical Documentation",
      "Medical Coding AI",
      "Medical Billing Support",
      "Revenue Cycle Optimization",
      "EHR Integration",
      "Physician Assistant AI",
      "HIPAA Compliant Healthcare SaaS",
      "Human-in-the-Loop Clinical AI",
    ],
    authors: [{ name: "NOTENRA Medical Intelligence", url: siteConfig.url }],
    creator: "NOTENRA",
    publisher: "NOTENRA Medical Intelligence",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: "NOTENRA - AI Medical Scribe & Clinical Intelligence",
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "NOTENRA - Documentation that moves at the speed of care",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NOTENRA - AI Medical Scribe & Clinical Intelligence",
      description: siteConfig.description,
      creator: siteConfig.twitterHandle,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
        width: 970,
        height: 257,
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.legalName,
      },
    },
    description: siteConfig.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "482",
    },
    featureList: [
      "Ambient AI Medical Scribing",
      "Human Expert Clinical Verification",
      "Automated Medical Coding (ICD-10 & CPT)",
      "Revenue Cycle Optimization & Denial Prevention",
      "HIPAA Compliant & SOC 2 Type II Certified",
    ],
  };

  return JSON.stringify(schema);
}
