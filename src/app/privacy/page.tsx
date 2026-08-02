"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/legal/LegalDocument";

/* DRAFT — not reviewed by counsel. Bracketed values must be completed before
   this is published, and the whole document needs a legal read: it makes
   representations to patients, practices, and regulators.
   Remove `showDraftNotice={false}` gating only after that review. */
const sections: LegalSection[] = [
  {
    id: "scope",
    heading: "Scope of this policy",
    blocks: [
      {
        type: "p",
        text: "This Privacy Policy explains how Notenra Medical Intelligence, Inc. (“NOTENRA”, “we”, “us”) collects and handles information through our website at notenra.com and our clinical documentation, coding, billing, and payroll services (the “Services”).",
      },
      {
        type: "callout",
        title: "Important distinction",
        text: "Protected Health Information that we process on behalf of a healthcare provider is NOT governed by this policy. It is governed by HIPAA and by the Business Associate Agreement between NOTENRA and that provider. If you are a patient asking about your medical records, please contact your healthcare provider directly — they are the custodian of your record, not us.",
      },
      {
        type: "p",
        text: "This policy therefore covers two groups: visitors to our website, and the administrators and clinicians who hold accounts with the Services. Section 4 explains separately, and for transparency only, how we handle PHI under our provider agreements.",
      },
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    blocks: [
      {
        type: "table",
        columns: ["Category", "Examples", "Source"],
        rows: [
          [
            "Contact information",
            "Name, work email, practice name, role, phone number",
            "Submitted by you through forms or demo requests",
          ],
          [
            "Account information",
            "Username, credentials, role and permissions, audit log of actions taken",
            "Created when your practice provisions your account",
          ],
          [
            "Usage information",
            "Pages viewed, features used, session timestamps, approximate location from IP",
            "Collected automatically as you use the Services",
          ],
          [
            "Device information",
            "Browser type and version, operating system, screen size, IP address",
            "Collected automatically by your browser",
          ],
          [
            "Communications",
            "Support tickets, correspondence, demo call notes",
            "Generated when you contact us",
          ],
          [
            "Billing information",
            "Practice billing contact, plan, invoice history",
            "Provided by your practice; card details are held by our payment processor, not by us",
          ],
        ],
      },
      {
        type: "p",
        text: "We do not purchase personal information from data brokers, and we do not collect sensitive personal information about website visitors beyond what is listed above.",
      },
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use information",
    blocks: [
      {
        type: "p",
        text: "We use the information described above for the following purposes, and not for unrelated purposes without telling you first:",
      },
      {
        type: "list",
        items: [
          "To provide, maintain, and support the Services for your practice",
          "To authenticate users and enforce role-based access controls",
          "To respond to demo requests, sales enquiries, and support tickets",
          "To maintain audit logs required for security and compliance",
          "To monitor service performance, diagnose faults, and prevent abuse",
          "To invoice your practice and administer your subscription",
          "To send service and security notices relevant to your account",
          "To comply with legal obligations and enforce our agreements",
        ],
      },
      {
        type: "subheading",
        text: "Marketing communications",
      },
      {
        type: "p",
        text: "We send marketing email only to business contacts who requested information or whose practice has a relationship with us. Every marketing message includes an unsubscribe link, and unsubscribing does not affect service or security notices that we must send you as an account holder.",
      },
    ],
  },
  {
    id: "phi",
    heading: "Protected Health Information and HIPAA",
    blocks: [
      {
        type: "p",
        text: "When a healthcare provider uses the Services, NOTENRA acts as a Business Associate under the Health Insurance Portability and Accountability Act. We execute a Business Associate Agreement with every practice before any PHI is processed, and that agreement — not this policy — defines our permitted uses and disclosures of PHI.",
      },
      { type: "subheading", text: "Our commitments regarding PHI" },
      {
        type: "list",
        items: [
          "We use and disclose PHI only as permitted by the applicable Business Associate Agreement and by law",
          "We apply the minimum necessary standard to every use and disclosure",
          "We do not use PHI to train third-party or shared foundation models",
          "We do not sell PHI under any circumstances",
          "Encounter audio is processed to produce the clinical note and is then discarded",
          "Access to PHI is role-restricted and recorded in immutable audit logs",
          "We notify the affected practice of any breach of unsecured PHI in accordance with the HIPAA Breach Notification Rule and the terms of the applicable agreement",
        ],
      },
      {
        type: "callout",
        title: "Patient requests",
        text: "Rights of access, amendment, accounting of disclosures, and restriction under HIPAA are exercised through your healthcare provider as the covered entity. If a patient contacts us directly, we will refer the request to the relevant provider rather than act on it ourselves.",
      },
    ],
  },
  {
    id: "ai-and-review",
    heading: "Automated processing and human review",
    blocks: [
      {
        type: "p",
        text: "The Services use automated systems to draft clinical documentation and propose codes, followed by review from qualified human reviewers. We want to be precise about what that means for privacy:",
      },
      {
        type: "list",
        items: [
          "Automated drafting operates on the clinical content of an encounter to produce a draft for review",
          "Human reviewers are personnel or contracted professionals bound by confidentiality obligations and trained on HIPAA requirements",
          "Reviewers access only the encounters assigned to them, and every access is logged",
          "The reviewing clinician or coder does not make treatment decisions; the responsible clinician retains authority over the final record",
          "No automated decision is made about a patient that produces a legal effect without human involvement",
          "Patient data is not used to train third-party or shared models, and we do not permit our model providers to retain it for their own purposes",
        ],
      },
    ],
  },
  {
    id: "sharing",
    heading: "When we share information",
    blocks: [
      {
        type: "p",
        text: "We do not sell personal information, and we do not share it for cross-context behavioural advertising. We disclose information only in these circumstances:",
      },
      {
        type: "table",
        columns: ["Recipient", "Purpose", "Safeguard"],
        rows: [
          [
            "Service providers",
            "Hosting, infrastructure, model processing, error monitoring, payment processing, email delivery",
            "Contractually bound; Business Associate Agreements where PHI is involved",
          ],
          [
            "Your practice",
            "Account administrators can see usage and audit information for users they administer",
            "Governed by role-based access controls",
          ],
          [
            "Integration partners",
            "EHR, practice management, clearinghouse, and payroll systems you direct us to connect to",
            "Only at your practice's instruction and configuration",
          ],
          [
            "Legal and regulatory",
            "Where required by law, subpoena, or to protect rights and safety",
            "Reviewed for validity and scope; practice notified where permitted",
          ],
          [
            "Corporate transaction",
            "In a merger, acquisition, or sale of assets",
            "Successor bound by this policy and by existing Business Associate Agreements",
          ],
        ],
      },
      {
        type: "p",
        text: "A current list of subprocessors that may handle PHI is available to customers on request at privacy@notenra.com.",
      },
    ],
  },
  {
    id: "security",
    heading: "How we protect information",
    blocks: [
      {
        type: "p",
        text: "We maintain administrative, technical, and physical safeguards appropriate to the sensitivity of the data we handle, including:",
      },
      {
        type: "list",
        items: [
          "Encryption in transit using TLS 1.3 and at rest using AES-256",
          "Role-based access control with least-privilege provisioning",
          "Immutable audit logging of access to clinical data",
          "SOC 2 Type II audited controls",
          "Background screening and confidentiality obligations for personnel with data access",
          "Documented incident response and breach notification procedures",
        ],
      },
      {
        type: "p",
        text: "No system is perfectly secure. We cannot guarantee absolute security, but we commit to notifying affected practices promptly where a breach occurs, in accordance with HIPAA and applicable state law.",
      },
    ],
  },
  {
    id: "retention",
    heading: "How long we keep information",
    blocks: [
      {
        type: "p",
        text: "Retention depends on the category of data and on the obligations attached to it:",
      },
      {
        type: "table",
        columns: ["Data", "Retention period"],
        rows: [
          [
            "Encounter audio",
            "Discarded once the clinical note has been produced",
          ],
          [
            "PHI and clinical records",
            "For the term of the practice agreement, then returned or destroyed as the Business Associate Agreement directs",
          ],
          [
            "Account and audit records",
            "For the term of the account plus [RETENTION PERIOD] to meet compliance and audit obligations",
          ],
          [
            "Website enquiry data",
            "[RETENTION PERIOD] from last contact, unless a customer relationship begins",
          ],
          [
            "Billing records",
            "As required by applicable tax and accounting law",
          ],
        ],
      },
    ],
  },
  {
    id: "your-rights",
    heading: "Your privacy rights",
    blocks: [
      {
        type: "p",
        text: "Depending on where you live, you may have the right to request access to the personal information we hold about you, to correct inaccuracies, to request deletion, to obtain a portable copy, and to appeal a refusal of any of these requests.",
      },
      {
        type: "subheading",
        text: "For residents of California and other US states with privacy statutes",
      },
      {
        type: "p",
        text: "We do not sell personal information or share it for cross-context behavioural advertising, so there is nothing to opt out of in those categories. You may still exercise access, correction, deletion, and portability rights, and we will not discriminate against you for doing so. You may use an authorised agent, and we will verify the request before acting on it.",
      },
      {
        type: "subheading",
        text: "How to make a request",
      },
      {
        type: "p",
        text: "Email privacy@notenra.com with the nature of your request. We will acknowledge within the period required by applicable law and will verify your identity before disclosing or deleting anything. Note that information held as PHI on behalf of a provider must be requested through that provider.",
      },
      {
        type: "callout",
        title: "Jurisdiction note",
        text: "This section must be completed for each jurisdiction NOTENRA operates in, including any applicable statutory response deadlines and appeal mechanisms, and must reflect whether the Services are offered to individuals outside the United States.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    blocks: [
      {
        type: "p",
        text: "Our website uses cookies and similar technologies that are strictly necessary for the site to function, together with analytics that help us understand how the site is used.",
      },
      {
        type: "list",
        items: [
          "Essential cookies maintain your session and security state and cannot be disabled",
          "Analytics cookies help us measure traffic and improve the site",
          "We do not use third-party advertising or cross-site tracking cookies",
          "Your browser can block or delete cookies, though essential cookies are required for the Services to work",
        ],
      },
      {
        type: "p",
        text: "We honour Global Privacy Control signals where our systems receive them. Cookies are never used inside the authenticated clinical application to profile patients.",
      },
    ],
  },
  {
    id: "transfers",
    heading: "Where information is processed",
    blocks: [
      {
        type: "p",
        text: "The Services are operated from the United States, and information is processed and stored there. If you access the Services from another country, you are transferring information to the United States, where data protection law differs from that of your own jurisdiction.",
      },
      {
        type: "callout",
        title: "To be completed",
        text: "If NOTENRA offers the Services to practices or individuals in the EEA, United Kingdom, or Switzerland, this section requires a lawful transfer mechanism, a description of the relevant safeguards, and the identity of any EU or UK representative.",
      },
    ],
  },
  {
    id: "children",
    heading: "Children's privacy",
    blocks: [
      {
        type: "p",
        text: "The Services are provided to healthcare organisations and their personnel, and our website is not directed at children. We do not knowingly collect personal information directly from children through the website.",
      },
      {
        type: "p",
        text: "Clinical records processed on behalf of a provider may relate to patients of any age, including minors. That information is handled as PHI under the applicable Business Associate Agreement and under HIPAA, together with any additional protections that state law affords to minors' records.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy as the Services or the law change. When we do, we will revise the “last updated” date at the top of this page. Where a change materially reduces your rights or expands our use of personal information, we will give notice through the Services or by email before it takes effect.",
      },
      {
        type: "p",
        text: "Changes to our handling of PHI are governed by the amendment provisions of the applicable Business Associate Agreement, not by this notice.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    blocks: [
      {
        type: "p",
        text: "For privacy questions, requests, or complaints about how we handle information, contact us at:",
      },
      {
        type: "list",
        items: [
          "Privacy enquiries and rights requests: privacy@notenra.com",
          "Security and incident reports: security@notenra.com",
          "General enquiries: hello@notenra.com",
          "Postal address: Notenra Medical Intelligence, Inc., [STREET ADDRESS], [CITY, STATE ZIP]",
        ],
      },
      {
        type: "p",
        text: "If you are not satisfied with our response, you may have the right to complain to your local data protection authority or, for HIPAA matters, to the US Department of Health and Human Services Office for Civil Rights.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={() => setIsDemoModalOpen(true)} />

      <LegalDocument
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How NOTENRA handles information about website visitors and account holders — and how protected health information is handled separately under HIPAA."
        effectiveDate="[EFFECTIVE DATE]"
        lastUpdated="30 July 2026"
        sections={sections}
      />

      <Footer />
      <LazyDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </main>
  );
}
