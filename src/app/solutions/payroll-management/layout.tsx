import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Payroll Management — Physician Compensation & RVU Analytics";
const description =
  "wRVU attribution, per-clinician compensation models, and statements that drill down to source encounters. Calculated from billed work, exported to your payroll provider.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/solutions/payroll-management",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/solutions/payroll-management`,
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

export default function PayrollManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
