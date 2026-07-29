import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Medical Documentation — AI Scribe with Human Clinical Review";
const description =
  "Ambient AI drafts SOAP notes, progress notes, consultation notes, and discharge summaries. Every note is verified by a certified clinical reviewer and delivered EHR-ready.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/solutions/medical-documentation",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/solutions/medical-documentation`,
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

export default function MedicalDocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
