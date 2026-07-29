import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Medical Coding | Human-Reviewed ICD-10, CPT, and HCPCS";
const description =
  "Accurate medical coding for ICD-10-CM, CPT, and HCPCS, with human-reviewed quality, compliance checks, reduced claim denials, and audit-ready rationale.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/medical-coding" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/solutions/medical-coding`,
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

export default function MedicalCodingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
