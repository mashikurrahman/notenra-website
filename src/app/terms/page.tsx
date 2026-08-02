"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/legal/LegalDocument";

/* DRAFT — not reviewed by counsel. This document allocates liability, sets a
   governing law, and disclaims warranties; every one of those clauses needs a
   lawyer's read before publication, and several depend on facts only NOTENRA
   knows (entity jurisdiction, fee terms, notice periods). */
const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "The agreement",
    blocks: [
      {
        type: "p",
        text: "These Terms of Service (“Terms”) govern access to and use of the websites, applications, and services provided by Notenra Medical Intelligence, Inc. (“NOTENRA”, “we”, “us”). By accessing the Services or by signing an order form that references these Terms, you agree to them.",
      },
      {
        type: "p",
        text: "Where NOTENRA and a customer have signed a separate written agreement covering the Services, that agreement controls to the extent it conflicts with these Terms. Where PHI is involved, the Business Associate Agreement controls on all matters within its scope.",
      },
      {
        type: "callout",
        title: "Order of precedence",
        text: "1. The Business Associate Agreement, for anything concerning protected health information. 2. A signed master agreement or order form. 3. These Terms of Service.",
      },
    ],
  },
  {
    id: "definitions",
    heading: "Definitions",
    blocks: [
      {
        type: "list",
        items: [
          "“Customer” means the healthcare organisation that has contracted for the Services.",
          "“Authorised User” means an individual the Customer permits to use the Services, including clinicians, coders, and administrative staff.",
          "“Customer Data” means data submitted to the Services by or on behalf of the Customer, including clinical documentation and encounter data.",
          "“PHI” means protected health information as defined by HIPAA.",
          "“Output” means documentation, codes, claims, calculations, or other material the Services generate from Customer Data.",
          "“Services” means the clinical documentation, medical coding, medical billing, and payroll management services NOTENRA makes available, together with the associated website and applications.",
        ],
      },
    ],
  },
  {
    id: "clinical-responsibility",
    heading: "Clinical responsibility and professional judgment",
    blocks: [
      {
        type: "callout",
        title: "Read this section carefully",
        text: "NOTENRA does not practise medicine, does not provide medical advice, and does not make clinical decisions. Output is a draft prepared to assist a qualified professional, and the responsible clinician remains solely accountable for the accuracy of the record and for every clinical decision.",
      },
      { type: "subheading", text: "What the Customer remains responsible for" },
      {
        type: "list",
        items: [
          "Reviewing Output before relying on it, signing it, or submitting it to any third party",
          "All clinical decisions concerning diagnosis, treatment, and patient care",
          "The accuracy and completeness of the medical record as finally signed",
          "Ensuring Authorised Users are appropriately licensed, credentialed, and trained",
          "Compliance with the professional and documentation standards applicable to its practice",
          "The final decision on codes submitted for reimbursement and on claims filed",
        ],
      },
      {
        type: "p",
        text: "Human review by NOTENRA personnel is a quality control step within the Services. It does not transfer clinical responsibility to NOTENRA, does not constitute a second clinical opinion, and does not establish a provider-patient relationship between NOTENRA and any patient.",
      },
      {
        type: "subheading",
        text: "Coding and billing Output",
      },
      {
        type: "p",
        text: "Codes and claims produced by the Services are recommendations based on the documentation available. The Customer is the party that submits claims and bears responsibility for their accuracy under applicable payer rules and under federal and state law, including the False Claims Act. NOTENRA does not guarantee reimbursement, payment amounts, or any particular payer outcome.",
      },
    ],
  },
  {
    id: "accounts",
    heading: "Accounts and access",
    blocks: [
      {
        type: "p",
        text: "The Customer is responsible for provisioning and deprovisioning Authorised Users, for the accuracy of account information, and for all activity that occurs under its accounts.",
      },
      {
        type: "list",
        items: [
          "Credentials are personal to each Authorised User and must not be shared",
          "The Customer must notify us promptly at security@notenra.com of any suspected unauthorised access",
          "Access must be revoked promptly when an Authorised User leaves the Customer's organisation",
          "We may suspend an account where we reasonably believe it has been compromised or is being used unlawfully",
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    blocks: [
      { type: "p", text: "The Customer and its Authorised Users must not:" },
      {
        type: "list",
        items: [
          "Submit data to the Services without the legal authority to do so",
          "Use the Services to provide services to any third party not covered by the agreement",
          "Reverse engineer, decompile, or attempt to derive the underlying models or source code",
          "Use the Services to develop a competing product, or to benchmark them for publication without our written consent",
          "Circumvent access controls, rate limits, or security measures",
          "Introduce malicious code, or interfere with the integrity or performance of the Services",
          "Rely on Output as a substitute for professional review, contrary to Section 3",
          "Use the Services in a manner that violates HIPAA, payer rules, or any applicable law",
        ],
      },
    ],
  },
  {
    id: "hipaa",
    heading: "HIPAA and the Business Associate Agreement",
    blocks: [
      {
        type: "p",
        text: "Where the Customer is a covered entity or a business associate and the Services will process PHI, the parties will execute a Business Associate Agreement before any PHI is submitted. That agreement is incorporated by reference into these Terms.",
      },
      {
        type: "list",
        items: [
          "NOTENRA will use and disclose PHI only as the Business Associate Agreement and applicable law permit",
          "NOTENRA will maintain safeguards consistent with the HIPAA Security Rule",
          "NOTENRA will report breaches of unsecured PHI as that agreement and the Breach Notification Rule require",
          "The Customer must not submit PHI before a Business Associate Agreement is in place",
          "The Customer is responsible for obtaining any patient notices, consents, or authorisations its own compliance obligations require",
        ],
      },
    ],
  },
  {
    id: "data-ownership",
    heading: "Customer Data and intellectual property",
    blocks: [
      { type: "subheading", text: "The Customer's rights" },
      {
        type: "p",
        text: "The Customer retains all right, title, and interest in Customer Data and in Output as incorporated into its medical records. NOTENRA claims no ownership of the clinical record. We are granted only the limited licence needed to provide, support, and secure the Services.",
      },
      { type: "subheading", text: "NOTENRA's rights" },
      {
        type: "p",
        text: "NOTENRA retains all right, title, and interest in the Services, including the software, models, interfaces, and documentation, together with all improvements to them. Nothing in these Terms transfers ownership of the Services to the Customer.",
      },
      { type: "subheading", text: "Model training" },
      {
        type: "p",
        text: "We do not use Customer Data or PHI to train third-party or shared foundation models, and we do not sell Customer Data. Any use of de-identified data must comply with the Business Associate Agreement and with the HIPAA de-identification standard.",
      },
      { type: "subheading", text: "Feedback" },
      {
        type: "p",
        text: "If the Customer provides suggestions or feedback about the Services, we may use it without restriction or obligation. Feedback must not contain PHI or confidential information.",
      },
    ],
  },
  {
    id: "integrations",
    heading: "Third-party systems and integrations",
    blocks: [
      {
        type: "p",
        text: "The Services connect to EHR, practice management, clearinghouse, and payroll systems at the Customer's direction. Those systems are operated by third parties under their own terms.",
      },
      {
        type: "list",
        items: [
          "The Customer is responsible for maintaining its own licences and entitlements to connected systems",
          "We are not responsible for the availability, accuracy, or acts of third-party systems",
          "A third party's change to its interface may interrupt an integration; we will make reasonable efforts to restore it",
          "Data the Customer directs us to transmit to a third-party system is transmitted at the Customer's instruction",
        ],
      },
    ],
  },
  {
    id: "fees",
    heading: "Fees and payment",
    blocks: [
      {
        type: "p",
        text: "Fees, billing frequency, and any minimum commitment are set out in the applicable order form. Except as that order form or applicable law provides, fees are non-refundable.",
      },
      {
        type: "list",
        items: [
          "Invoices are payable within [PAYMENT TERM] days of the invoice date",
          "Overdue amounts may accrue interest at [INTEREST RATE], to the extent permitted by law",
          "Fees are exclusive of taxes, which the Customer is responsible for except for taxes on our income",
          "We may change fees on renewal with at least [NOTICE PERIOD] days' written notice",
          "We may suspend the Services for material non-payment after written notice and a reasonable cure period",
        ],
      },
      {
        type: "callout",
        title: "To be completed",
        text: "Payment terms, interest, notice periods, and any suspension mechanics must be set to NOTENRA's actual commercial terms and checked against applicable law before publication.",
      },
    ],
  },
  {
    id: "availability",
    heading: "Service availability and support",
    blocks: [
      {
        type: "p",
        text: "We aim to keep the Services continuously available and will give advance notice of planned maintenance where practicable. Any committed availability target and support response times are set out in the applicable order form or service level agreement.",
      },
      {
        type: "p",
        text: "The Services may be unavailable due to maintenance, third-party failures, or events outside our reasonable control. Because clinical work cannot stop when software does, the Customer should maintain a documented fallback process for capturing encounters during an outage.",
      },
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    blocks: [
      {
        type: "p",
        text: "Each party may receive information the other treats as confidential. The receiving party will use it only to perform under these Terms, will protect it with at least reasonable care, and will limit access to personnel who need it.",
      },
      {
        type: "p",
        text: "These obligations do not apply to information that is public through no fault of the receiving party, was already known to it, or is independently developed. Disclosure compelled by law is permitted where the other party is given notice and a reasonable opportunity to object. Confidentiality obligations concerning PHI are governed by the Business Associate Agreement.",
      },
    ],
  },
  {
    id: "term",
    heading: "Term, termination, and data return",
    blocks: [
      {
        type: "p",
        text: "These Terms apply for as long as the Customer uses the Services or until the applicable subscription term ends.",
      },
      {
        type: "list",
        items: [
          "Either party may terminate for material breach that remains uncured [CURE PERIOD] days after written notice",
          "We may suspend access immediately where continued use presents a security risk or is unlawful",
          "On termination, the Customer's right to access the Services ends",
          "The Customer may export Customer Data for [EXPORT PERIOD] days after termination",
          "After that period, PHI is returned or destroyed as the Business Associate Agreement directs",
        ],
      },
      {
        type: "callout",
        title: "Records retention",
        text: "The Customer remains responsible for retaining medical records for the period its own legal and professional obligations require. Termination of the Services does not discharge that duty, and the Customer should export its records before access ends.",
      },
    ],
  },
  {
    id: "warranties",
    heading: "Disclaimer of warranties",
    blocks: [
      {
        type: "p",
        text: "We warrant that we will provide the Services with reasonable skill and care and in accordance with applicable law.",
      },
      {
        type: "p",
        text: "Otherwise, and to the maximum extent permitted by law, the Services are provided “as is” and “as available”. We disclaim all other warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      },
      {
        type: "p",
        text: "We do not warrant that the Services will be uninterrupted or error-free, that Output will be free of inaccuracies, that any particular level of coding accuracy or reimbursement will be achieved, or that the Services will satisfy the Customer's own regulatory obligations. Output requires professional review under Section 3.",
      },
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost revenue, or lost data, even if advised of the possibility.",
      },
      {
        type: "p",
        text: "Each party's total aggregate liability arising out of or relating to these Terms is limited to the fees paid or payable by the Customer to NOTENRA in the [LIABILITY PERIOD] months preceding the event giving rise to the claim.",
      },
      {
        type: "p",
        text: "These limitations do not apply to a party's liability for fraud, wilful misconduct, death or personal injury caused by negligence, the Customer's obligation to pay fees, or any liability that cannot be limited under applicable law. Liability concerning PHI is subject to the Business Associate Agreement.",
      },
      {
        type: "callout",
        title: "To be completed",
        text: "The liability cap, its multiple, and any carve-outs — particularly for data breach and for indemnity obligations — are commercial decisions that must be set by NOTENRA with counsel. The bracketed period above is a placeholder, not a recommendation.",
      },
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnification",
    blocks: [
      {
        type: "p",
        text: "NOTENRA will defend the Customer against third-party claims alleging that the Services, as provided by us and used in accordance with these Terms, infringe that third party's intellectual property rights, and will pay damages finally awarded.",
      },
      {
        type: "p",
        text: "The Customer will defend NOTENRA against third-party claims arising from Customer Data submitted without legal authority, from the Customer's failure to review Output as Section 3 requires, from claims the Customer submitted for reimbursement, or from the Customer's breach of applicable law.",
      },
      {
        type: "p",
        text: "The indemnified party must give prompt notice, allow the indemnifying party to control the defence, and provide reasonable cooperation. No settlement that imposes an obligation on the indemnified party may be made without its consent.",
      },
    ],
  },
  {
    id: "disputes",
    heading: "Governing law and disputes",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of the State of [GOVERNING STATE], without regard to its conflict of laws rules. The parties submit to the exclusive jurisdiction of the courts located in [VENUE].",
      },
      {
        type: "p",
        text: "Before commencing proceedings, the parties will attempt to resolve the dispute in good faith through discussion between senior representatives for at least [ESCALATION PERIOD] days. Either party may seek injunctive relief at any time to protect its intellectual property or confidential information.",
      },
      {
        type: "callout",
        title: "To be completed",
        text: "Governing law, venue, and whether disputes go to arbitration or to court are material decisions with consequences for cost and for class-action exposure. They must be set deliberately with counsel — and if arbitration or a class-action waiver is adopted, additional disclosure requirements apply.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to these Terms",
    blocks: [
      {
        type: "p",
        text: "We may amend these Terms as the Services and the law change. We will post the amended version with a revised “last updated” date, and where a change materially affects the Customer's rights or obligations we will give at least [NOTICE PERIOD] days' notice through the Services or by email.",
      },
      {
        type: "p",
        text: "Continued use after a change takes effect constitutes acceptance. A Customer under a signed order form is subject to the amendment provisions of that agreement instead.",
      },
    ],
  },
  {
    id: "general",
    heading: "General provisions",
    blocks: [
      {
        type: "list",
        items: [
          "Entire agreement: these Terms, with any order form and the Business Associate Agreement, are the entire agreement between the parties on this subject.",
          "Severability: if a provision is held unenforceable, the remainder stays in force and the provision is limited to the minimum extent necessary.",
          "No waiver: failure to enforce a provision is not a waiver of the right to enforce it later.",
          "Assignment: neither party may assign these Terms without the other's consent, except to a successor in a merger or sale of substantially all assets.",
          "Force majeure: neither party is liable for delay or failure caused by events beyond its reasonable control.",
          "Independent parties: nothing here creates a partnership, agency, joint venture, or employment relationship.",
          "Notices: notices to NOTENRA go to legal@notenra.com; notices to the Customer go to its designated account contact.",
          "Survival: sections concerning confidentiality, intellectual property, disclaimers, liability, indemnity, and disputes survive termination.",
        ],
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    blocks: [
      {
        type: "p",
        text: "Questions about these Terms can be directed to:",
      },
      {
        type: "list",
        items: [
          "Legal and contractual: legal@notenra.com",
          "Security reports: security@notenra.com",
          "Support: support@notenra.com",
          "Postal address: Notenra Medical Intelligence, Inc., [STREET ADDRESS], [CITY, STATE ZIP]",
        ],
      },
    ],
  },
];

export default function TermsOfServicePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={() => setIsDemoModalOpen(true)} />

      <LegalDocument
        eyebrow="Legal"
        title="Terms of Service"
        intro="The terms on which NOTENRA provides its documentation, coding, billing, and payroll services — including where clinical responsibility sits."
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
