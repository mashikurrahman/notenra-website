"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserSearch,
  SearchCheck,
  Send,
  Receipt,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Eligibility is confirmed first",
    lane: "Before the visit",
    icon: UserSearch,
    description:
      "Coverage, plan details, and authorization requirements are checked ahead of the encounter — where a problem is still cheap to fix.",
    detail: {
      heading: "The cheapest denial to prevent",
      body: "Coverage and authorization failures are among the most common reasons claims come back, and they are almost entirely avoidable. Verification happens before the patient is seen, not after the claim is rejected.",
      points: [
        "Real-time eligibility and benefits check",
        "Prior authorization requirements surfaced early",
        "Patient responsibility known before the visit",
      ],
    },
  },
  {
    number: "02",
    title: "Charges are captured completely",
    lane: "Charge capture",
    icon: Receipt,
    description:
      "Reviewed codes flow in from the clinical record, so what was documented and performed is what gets billed.",
    detail: {
      heading: "Nothing documented goes unbilled",
      body: "Charges are reconciled against the encounter rather than re-keyed from a superbill. Missed procedures, unbilled supplies, and dropped charges are surfaced instead of quietly lost.",
      points: [
        "Charges reconciled against the clinical record",
        "Unbilled procedures and supplies flagged",
        "Fee schedule applied per payer contract",
      ],
    },
  },
  {
    number: "03",
    title: "The claim is scrubbed",
    lane: "Pre-submission",
    icon: SearchCheck,
    highlight: true,
    description:
      "This is where the money is saved. Every claim runs against payer-specific edits before it is ever transmitted.",
    detail: {
      heading: "The step that prevents the denial",
      body: "Bundling conflicts, missing modifiers, absent NDC detail, demographic mismatches, and payer-specific quirks are caught while the claim is still editable — which costs minutes instead of a full rework cycle.",
      points: [
        "NCCI, LCD, and payer-specific edits applied",
        "Modifier and unit logic validated",
        "Issues corrected pre-submission, not appealed after",
      ],
    },
  },
  {
    number: "04",
    title: "Submission and remittance",
    lane: "Clearinghouse",
    icon: Send,
    description:
      "Clean claims transmit electronically, and every ERA that comes back is posted and reconciled against what was expected.",
    detail: {
      heading: "Paid is not the same as paid correctly",
      body: "Remittances are matched line by line against the contracted rate. Underpayments and silent adjustments are identified rather than accepted as the payer's final word.",
      points: [
        "Electronic submission with acknowledgement tracking",
        "ERA posting reconciled line by line",
        "Underpayments against contract flagged for appeal",
      ],
    },
  },
  {
    number: "05",
    title: "Denials and A/R are worked",
    lane: "Follow-through",
    icon: RotateCcw,
    description:
      "What still comes back denied is worked to resolution — corrected, appealed, and tracked until it is paid or formally closed.",
    detail: {
      heading: "Nothing ages quietly",
      body: "Denials are triaged by root cause, not just resubmitted. Recurring causes feed back into the scrub rules, so the same denial reason stops recurring instead of becoming a monthly line item.",
      points: [
        "Denials triaged by root cause and appealed",
        "A/R worked by age with escalation thresholds",
        "Recurring causes fed back into scrub rules",
      ],
    },
  },
];

export function BillingProcess() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="lifecycle"
      className="py-10 sm:py-16 bg-white border-y border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            The claim lifecycle, end to end.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Five stages from eligibility to payment — with the scrub in the
            middle, where a denial is still just an edit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step rail */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = active === idx;
              return (
                <button
                  key={s.number}
                  onClick={() => setActive(idx)}
                  aria-current={isActive}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-white border-brand-teal shadow-xs"
                      : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "surface-teal text-white shadow-xs"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                          Step {s.number}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            s.highlight
                              ? "bg-brand-teal/10 text-brand-teal border-brand-teal-100"
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          {s.lane}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-brand-ink mb-1">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="bg-slate-50 rounded-3xl p-8 relative overflow-hidden shadow-xs border border-brand-teal-200 min-h-105">
              <div className="absolute inset-x-0 top-0 h-1 surface-teal" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-brand-teal-100">
                    <div className="w-11 h-11 rounded-xl surface-teal flex items-center justify-center text-white shadow-xs">
                      {React.createElement(step.icon, { className: "w-5 h-5" })}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                        Stage {step.number}
                      </div>
                      <h4 className="text-xl font-bold text-brand-ink">
                        {step.detail.heading}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.detail.body}
                  </p>

                  <div className="space-y-2.5">
                    {step.detail.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 text-xs text-slate-600"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-aqua/25 text-brand-teal flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-brand-teal-100">
                    <span className="text-xs text-slate-500">
                      Step {active + 1} of {steps.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {steps.map((s, dot) => (
                        <button
                          key={s.number}
                          onClick={() => setActive(dot)}
                          aria-label={`Go to step ${dot + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            dot === active
                              ? "w-8 surface-teal"
                              : "w-2 bg-brand-ink/15 hover:bg-brand-teal/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
