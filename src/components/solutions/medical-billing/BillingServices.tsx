"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  Send,
  RotateCcw,
  Landmark,
  UserRound,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    id: "eligibility",
    name: "Eligibility & Auth",
    icon: BadgeCheck,
    tagline: "Verified before the patient is seen",
    description:
      "Coverage, benefits, and authorization requirements are confirmed ahead of the encounter, so a claim is never built on a plan that will not cover it.",
    highlights: [
      "Real-time eligibility and benefit checks",
      "Authorization requirements surfaced pre-visit",
      "Patient responsibility estimated up front",
    ],
    sample: [
      { label: "Plan", value: "Active — commercial PPO, verified today" },
      { label: "Auth", value: "Required for 20610 — obtained, #A4471902" },
      { label: "Deductible", value: "$450 of $1,500 met" },
      { label: "Patient est.", value: "$68.00 copay + coinsurance" },
    ],
  },
  {
    id: "submission",
    name: "Claim Submission",
    icon: Send,
    tagline: "Scrubbed, transmitted, acknowledged",
    description:
      "Claims are validated against payer-specific edits, transmitted electronically, and tracked through acknowledgement — so a claim never silently fails to arrive.",
    highlights: [
      "Payer-specific edits applied pre-submission",
      "Electronic 837 submission with tracking",
      "Clearinghouse rejections resolved same-day",
    ],
    sample: [
      { label: "Scrub", value: "4 checks passed, 1 corrected pre-submission" },
      { label: "Sent", value: "837P transmitted 09:14" },
      { label: "Ack", value: "277CA accepted — no errors" },
      { label: "Status", value: "In adjudication" },
    ],
  },
  {
    id: "denials",
    name: "Denial Management",
    icon: RotateCcw,
    tagline: "Worked to resolution, not resubmitted blindly",
    description:
      "Denials are triaged by root cause, corrected, and appealed with supporting documentation attached — and the cause is fed back into the scrub so it stops recurring.",
    highlights: [
      "Root-cause triage, not blind resubmission",
      "Appeals filed with documentation attached",
      "A/R worked by age with escalation thresholds",
    ],
    sample: [
      { label: "Denial", value: "CO-97 — service included in another" },
      { label: "Cause", value: "Modifier -25 omitted on E/M line" },
      { label: "Action", value: "Corrected claim filed with note excerpt" },
      { label: "Prevention", value: "Scrub rule added for this payer" },
    ],
  },
  {
    id: "posting",
    name: "Payment Posting",
    icon: Landmark,
    tagline: "Reconciled against what you are owed",
    description:
      "Remittances are posted line by line and compared to your contracted rates, so underpayments and unexplained adjustments surface instead of closing quietly.",
    highlights: [
      "ERA and manual payments posted line by line",
      "Adjustments matched to contract terms",
      "Underpayments flagged for appeal",
    ],
    sample: [
      { label: "Billed", value: "$348.40" },
      { label: "Allowed", value: "$281.12 per contract" },
      { label: "Paid", value: "$213.12 — patient responsibility $68.00" },
      { label: "Variance", value: "None — matches contracted rate" },
    ],
  },
  {
    id: "patient",
    name: "Patient Billing",
    icon: UserRound,
    tagline: "Statements patients can actually understand",
    description:
      "Patient balances are billed in plain language with clear payment options, which collects more of what is owed and generates fewer confused phone calls to your front desk.",
    highlights: [
      "Plain-language statements, not code dumps",
      "Online, phone, and plan payment options",
      "Balance questions handled before they reach staff",
    ],
    sample: [
      { label: "Balance", value: "$68.00 after insurance" },
      { label: "Explains", value: "Copay $40 + coinsurance $28" },
      { label: "Options", value: "Online, phone, or 3-month plan" },
      { label: "Reminders", value: "Scheduled — day 14 and day 30" },
    ],
  },
];

export function BillingServices() {
  const [selected, setSelected] = useState(0);
  const active = services[selected];

  return (
    <section
      id="services"
      className="py-10 sm:py-16 bg-white border-y border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Everything between the visit and the payment.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            One team and one trail across the whole revenue cycle — not five
            vendors with five portals.
          </p>
        </div>

        {/* Service selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isSelected = selected === idx;
            return (
              <button
                key={service.id}
                onClick={() => setSelected(idx)}
                aria-current={isSelected}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border ${
                  isSelected
                    ? "surface-teal text-white border-brand-teal shadow-xs scale-[1.03]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-brand-teal-200 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-2 ${isSelected ? "text-white" : "text-brand-teal"}`}
                />
                <span className="text-xs font-bold leading-tight">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-teal">
                {active.tagline}
              </div>
              <h3 className="text-2xl font-bold text-brand-ink">
                {active.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {active.description}
              </p>

              <div className="pt-2 space-y-2.5">
                {active.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 text-xs text-slate-600"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-aqua/25 text-brand-teal flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Worked example */}
            <div className="lg:col-span-6 bg-slate-50 text-slate-700 rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-brand-teal font-bold text-[11px] border-b border-slate-200 pb-2 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Worked example
              </div>
              <div className="space-y-2.5 pt-1">
                {active.sample.map((row) => (
                  <div key={row.label} className="flex gap-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal shrink-0 w-24 pt-0.5">
                      {row.label}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
