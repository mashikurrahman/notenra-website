import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Privacy Policy";
const description =
  "How NOTENRA collects and handles information about website visitors and account holders, and how protected health information is handled separately under HIPAA and our Business Associate Agreements.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/privacy`,
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

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
