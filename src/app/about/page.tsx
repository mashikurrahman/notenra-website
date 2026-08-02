import type { Metadata } from "next";
import { AboutClientPage } from "./AboutClientPage";

export const metadata: Metadata = {
  title: "About NOTENRA | Clinical Documentation & AI Workflows",
  description: "NOTENRA is built by clinicians and engineers to streamline charting. Discover our hybrid AI-human approach to clinical notes, medical coding, and billing.",
  alternates: {
    canonical: "https://notenra.com/about",
  },
  openGraph: {
    title: "About NOTENRA | Clinical Documentation & AI Workflows",
    description: "NOTENRA is built by clinicians and engineers to streamline charting. Discover our hybrid AI-human approach to clinical notes, medical coding, and billing.",
    url: "https://notenra.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClientPage />;
}
