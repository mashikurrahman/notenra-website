"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Cpu, UserCheck, FileCheck, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "The visit is captured",
    lane: "Ambient AI",
    icon: Mic,
    description:
      "Start the encounter and put the phone down. Ambient capture separates clinician, patient, and caregiver voices while filtering room noise.",
    detail: {
      heading: "Conversation, not dictation",
      body: "No wake words, no templates, no structured prompts. Physicians speak to the patient exactly as they always have.",
      points: [
        "Multi-speaker separation",
        "Specialty acoustic tuning",
        "Works on desktop, tablet, or mobile",
      ],
    },
  },
  {
    number: "02",
    title: "AI drafts the note",
    lane: "Ambient AI",
    icon: Cpu,
    description:
      "The conversation is distilled into clinical facts and structured into your practice's preferred note format within seconds of sign-off.",
    detail: {
      heading: "Structured to your format",
      body: "SOAP, H&P, progress, consult, or discharge — mapped to the layout your practice already uses, with codes suggested alongside.",
      points: [
        "Practice-specific note structure",
        "ICD-10 and CPT suggested inline",
        "Draft ready in under 45 seconds",
      ],
    },
  },
  {
    number: "03",
    title: "A clinician reviews it",
    lane: "Human in the loop",
    icon: UserCheck,
    highlight: true,
    description:
      "This is the step most AI scribes skip. A certified clinical reviewer reads the draft against the encounter before it ever reaches you.",
    detail: {
      heading: "The step that makes it trustworthy",
      body: "Board-certified reviewers verify clinical accuracy, catch omissions, and confirm coding specificity. Nothing reaches your inbox unverified.",
      points: [
        "Board-certified clinical reviewers",
        "Every note checked, not sampled",
        "Corrections feed back into your templates",
      ],
    },
  },
  {
    number: "04",
    title: "You sign and it syncs",
    lane: "Your EHR",
    icon: FileCheck,
    description:
      "Open a finished note, make any final edits, and sign. Structured content and codes flow into the chart through bi-directional FHIR/HL7.",
    detail: {
      heading: "Arrives where you already work",
      body: "Epic, Cerner, AthenaHealth, eClinicalWorks and 40+ platforms. No copy-paste, no second window, no re-keying.",
      points: [
        "Bi-directional FHIR / HL7 sync",
        "Codes travel with the note",
        "Full audit trail retained",
      ],
    },
  },
];

export function DocProcess() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="process"
      className="py-10 sm:py-16 bg-white border-y border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            AI writes it. A clinician stands behind it.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Four steps from spoken conversation to a signed note in your chart —
            with a human reviewer in the middle.
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
            <div className="bg-slate-50 rounded-3xl p-8 relative overflow-hidden shadow-xs  border border-brand-teal-200 min-h-105">
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
                        className="flex items-center gap-3 text-sm text-slate-600"
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
