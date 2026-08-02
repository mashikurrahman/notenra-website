import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Terms of Service";
const description =
  "The terms on which NOTENRA provides its clinical documentation, medical coding, billing, and payroll management services, including clinical responsibility and HIPAA obligations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/terms`,
    title,
    description,
    siteName: siteConfig.name,
  },
  /* Draft legal copy should not be indexed. Remove this block once the
     document has been through counsel and published. */
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
