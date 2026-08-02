import type { Metadata } from "next";
import { ContactClientPage } from "./ContactClientPage";

export const metadata: Metadata = {
  title: "Contact NOTENRA | Connect with Clinical Workflow Specialists",
  description: "Have questions about NOTENRA's ambient AI scribe, medical coding, or billing workflows? Contact our team of specialists for a consultation.",
  alternates: {
    canonical: "https://notenra.com/contact",
  },
  openGraph: {
    title: "Contact NOTENRA | Connect with Clinical Workflow Specialists",
    description: "Have questions about NOTENRA's ambient AI scribe, medical coding, or billing workflows? Contact our team of specialists for a consultation.",
    url: "https://notenra.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}
