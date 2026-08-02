"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Code2,
  Layers3,
  Tags,
  Gauge,
  CheckCircle2,
} from "lucide-react";

const sets = [
  {
    id: "icd",
    name: "ICD-10-CM",
    icon: Stethoscope,
    tagline: "Diagnoses with the specificity the record supports",
    code: "M17.11",
    title: "Unilateral primary osteoarthritis, right knee",
    description:
      "Clinical context is used to separate the diagnosis that is documented from the one that is merely possible — then coded to the highest specificity the chart actually evidences.",
    highlights: [
      "Laterality confirmed against the exam",
      "Specificity supported by documentation",
      "Assessment matched to the coded diagnosis",
    ],
    checks: [
      { label: "Laterality", value: "Right — documented in exam and imaging" },
      { label: "Specificity", value: "Primary OA stated, not 'knee pain'" },
      { label: "Support", value: "Weight-bearing X-ray findings on file" },
    ],
  },
  {
    id: "cpt",
    name: "CPT",
    icon: Code2,
    tagline: "Procedures and services, accurately represented",
    code: "20610",
    title: "Arthrocentesis, aspiration and/or injection; major joint",
    description:
      "Procedures are mapped to the service actually performed, with the procedure note, global period rules, and modifier logic reviewed before anything reaches billing.",
    highlights: [
      "Procedure note linked to the code",
      "Global period rules checked",
      "Modifier necessity reviewed",
    ],
    checks: [
      { label: "Service", value: "Major joint injection, sterile technique" },
      { label: "Global rules", value: "No overlapping global period" },
      { label: "Bundling", value: "NCCI pairs cleared" },
    ],
  },
  {
    id: "hcpcs",
    name: "HCPCS",
    icon: Layers3,
    tagline: "Drugs and supplies captured alongside the procedure",
    code: "J3301",
    title: "Injection, triamcinolone acetonide, per 10 mg",
    description:
      "Administered medications and supplies are reconciled with the encounter so units, waste, and NDC detail are captured cleanly rather than dropped from the claim.",
    highlights: [
      "Unit calculation checked against dose",
      "Supply and waste captured",
      "NDC available for payers that require it",
    ],
    checks: [
      { label: "Dose", value: "40 mg administered — 4 units" },
      { label: "Waste", value: "None documented" },
      { label: "NDC", value: "Attached for payer requirement" },
    ],
  },
  {
    id: "modifiers",
    name: "Modifiers",
    icon: Tags,
    tagline: "The detail that decides whether a claim survives",
    code: "-25",
    title: "Significant, separately identifiable E/M on the same day",
    description:
      "Missing and misapplied modifiers are among the most common causes of preventable denials. Each one is justified against the documentation before submission, not added after a rejection.",
    highlights: [
      "Necessity justified from the note",
      "Conflicting combinations rejected",
      "Payer-specific rules applied",
    ],
    checks: [
      { label: "-25", value: "Separate E/M documented beyond the procedure" },
      { label: "-RT", value: "Right side — consistent across all lines" },
      { label: "Conflicts", value: "No mutually exclusive pairs present" },
    ],
  },
  {
    id: "em",
    name: "E/M Levels",
    icon: Gauge,
    tagline: "Levelled on documented effort, not habit",
    code: "99214",
    title: "Established patient office visit, moderate complexity",
    description:
      "E/M selection follows documented medical decision-making and time — which protects against the two failure modes that both cost money: chronic under-coding and indefensible up-coding.",
    highlights: [
      "MDM elements identified in the note",
      "Time-based alternative compared",
      "Under-coding flagged, not just over-coding",
    ],
    checks: [
      { label: "Problems", value: "Two stable chronic conditions addressed" },
      { label: "Data", value: "Prior labs reviewed and interpreted" },
      { label: "Risk", value: "Prescription drug management — moderate" },
    ],
  },
];

export function CodeSets() {
  const [selected, setSelected] = useState(0);
  const active = sets[selected];

  return (
    <section
      id="code-sets"
      className="py-10 sm:py-16 bg-white border-y border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Coverage across every code set that matters.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            One workflow for the diagnoses, procedures, drugs, modifiers, and
            visit levels that together make a complete claim.
          </p>
        </div>

        {/* Set selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {sets.map((set, idx) => {
            const Icon = set.icon;
            const isSelected = selected === idx;
            return (
              <button
                key={set.id}
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
                  {set.name}
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

              <div className="font-mono text-3xl font-extrabold text-brand-teal">
                {active.code}
              </div>

              <h3 className="text-2xl font-bold text-brand-ink">
                {active.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {active.description}
              </p>

              <div className="pt-2 space-y-2.5">
                {active.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-aqua/25 text-brand-teal flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support check panel */}
            <div className="lg:col-span-6 bg-slate-50 text-slate-700 rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-brand-teal font-bold text-[11px] border-b border-slate-200 pb-2 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Coding support check
              </div>
              <div className="space-y-2.5 pt-1">
                {active.checks.map((row) => (
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
