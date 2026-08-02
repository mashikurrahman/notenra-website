"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSearch,
  ClipboardCheck,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Clinical context arrives",
    lane: "Chart intake",
    icon: FileSearch,
    description:
      "Notes, orders, results, and procedure records are assembled into one coding-ready view of the encounter.",
    detail: {
      heading: "The whole encounter, not just the note",
      body: "A code is only defensible if the record supports it. Everything documented for the visit is pulled together first, so specificity is evidenced rather than assumed.",
      points: [
        "Diagnoses linked to procedures performed",
        "Supporting documentation surfaced per code",
        "Missing or ambiguous details flagged before coding",
      ],
    },
  },
  {
    number: "02",
    title: "Codes are mapped",
    lane: "Automated pass",
    icon: ClipboardCheck,
    description:
      "ICD-10-CM, CPT, HCPCS, and modifiers are proposed with the rationale that supports each selection.",
    detail: {
      heading: "Grounded in the chart, checked against the rules",
      body: "Suggestions are validated against current code-set logic — laterality, specificity, bundling, and modifier rules — before a reviewer ever opens the encounter.",
      points: [
        "Specificity and laterality verified",
        "NCCI bundling conflicts surfaced",
        "Modifier logic validated against the procedure note",
      ],
    },
  },
  {
    number: "03",
    title: "A certified coder reviews",
    lane: "Human in the loop",
    icon: UserCheck,
    highlight: true,
    description:
      "A credentialed coding professional validates the final selection and the evidence behind it — on every encounter.",
    detail: {
      heading: "The step that makes it defensible",
      body: "Certified coders reconcile each code against the documentation, resolve edge cases, and record why the selection stands. Every encounter is reviewed, not sampled.",
      points: [
        "CPC / CCS-credentialed reviewers",
        "Every encounter reviewed, not a sampled subset",
        "Queries routed back to the clinician when documentation is thin",
      ],
    },
  },
  {
    number: "04",
    title: "The claim moves cleanly",
    lane: "Billing handoff",
    icon: ShieldCheck,
    description:
      "Approved coding flows to billing as a complete package, with the audit trail attached rather than reconstructed later.",
    detail: {
      heading: "Billing receives a finished package",
      body: "Clear codes, attached rationale, and routed exceptions give the revenue cycle team what they need before a claim goes out — instead of a denial to work afterwards.",
      points: [
        "Claim-ready code package with rationale",
        "Exceptions routed to the right queue",
        "Full review history retained for audit",
      ],
    },
  },
];

export function CodingWorkflow() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="workflow"
      className="py-10 sm:py-16 bg-white border-y border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            A clean path from chart to claim.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Four steps, one audit trail — with a certified coder standing
            between the automation and your claim.
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

                  {/* Progress rail */}
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
