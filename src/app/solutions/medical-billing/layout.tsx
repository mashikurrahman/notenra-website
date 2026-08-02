import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Medical Billing — Pre-Claim Scrubbing & Denial Prevention";
const description =
  "Claims scrubbed against payer-specific edits before submission, denials worked to resolution by root cause, and remittances reconciled against your contracted rates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/solutions/medical-billing",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/solutions/medical-billing`,
    title,
    description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage],
  },
};

export default function MedicalBillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
