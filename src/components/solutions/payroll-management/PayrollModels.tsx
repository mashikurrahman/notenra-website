"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Layers,
  Award,
  PieChart,
  CheckCircle2,
} from "lucide-react";

/* All figures below are illustrative sample calculations, not benchmarks —
   they exist to show that the arithmetic is visible, not to suggest a rate. */
const models = [
  {
    id: "salary",
    name: "Straight Salary",
    icon: Wallet,
    tagline: "Fixed pay, still fully reported",
    description:
      "A flat salary does not need production math, but it still needs production visibility. Clinicians on salary are measured on the same basis as everyone else, so leadership can see cost against output.",
    highlights: [
      "Fixed periods with pro-rata partial months",
      "Production still tracked for reporting",
      "Cost-per-wRVU visible for planning",
    ],
    calc: [
      { label: "Annual", value: "$225,000 per agreement" },
      { label: "Period", value: "÷ 12 = $18,750" },
      { label: "Tracked", value: "412 wRVU produced this period" },
      { label: "Cost/wRVU", value: "$45.51 — reporting only" },
    ],
  },
  {
    id: "wrvu",
    name: "wRVU Productivity",
    icon: TrendingUp,
    tagline: "Paid on documented, billed work",
    description:
      "Work RVUs are derived from the codes actually billed, then multiplied by the conversion factor in the agreement — including tiered rates that step up past a threshold.",
    highlights: [
      "wRVUs from billed codes, not estimates",
      "Tiered conversion factors supported",
      "Attribution rules for shared and supervised visits",
    ],
    calc: [
      { label: "Tier 1", value: "380 wRVU × $44.00 = $16,720" },
      { label: "Tier 2", value: "32 wRVU × $52.00 = $1,664" },
      { label: "Total", value: "412 wRVU → $18,384" },
      { label: "Source", value: "Drillable to term encounters" },
    ],
  },
  {
    id: "hybrid",
    name: "Base + Incentive",
    icon: Layers,
    tagline: "A guarantee with upside above it",
    description:
      "The most common physician arrangement, and the one most often miscalculated. A base salary credits a fixed volume of production; only work beyond that threshold earns incentive.",
    highlights: [
      "Base credit netted before incentive applies",
      "Threshold prorated for partial periods",
      "Negative periods handled per agreement terms",
    ],
    calc: [
      { label: "Base", value: "$18,750 — credits 380 wRVU" },
      { label: "Produced", value: "412 wRVU × $46.20 = $19,034" },
      { label: "Credit", value: "− $17,556 base-covered production" },
      { label: "Incentive", value: "$1,478 above threshold" },
    ],
  },
  {
    id: "quality",
    name: "Quality Bonus",
    icon: Award,
    tagline: "Value-based terms, measured honestly",
    description:
      "Quality and value-based components are calculated against defined measures with the underlying data attached — so a bonus that was not paid can be explained as precisely as one that was.",
    highlights: [
      "Per-measure results, not a single blended score",
      "Partial attainment paid where terms allow",
      "Measure data retained for the review cycle",
    ],
    calc: [
      { label: "Measures", value: "4 of 5 met this period" },
      { label: "Met", value: "Screening, A1c, BP, follow-up" },
      { label: "Missed", value: "Med reconciliation — 82% vs 90% target" },
      { label: "Bonus", value: "$1,200 of $1,500 pool" },
    ],
  },
  {
    id: "partner",
    name: "Partner Distribution",
    icon: PieChart,
    tagline: "Shareholder economics, not just payroll",
    description:
      "Partner and shareholder distributions are calculated from collections net of allocated overhead, with the allocation basis stated rather than assumed — including locum and per-diem cost.",
    highlights: [
      "Collections-based rather than charge-based",
      "Overhead allocated on a stated basis",
      "Locum and per-diem costs attributed to the covering site",
    ],
    calc: [
      { label: "Collections", value: "$94,200 attributed this period" },
      { label: "Direct cost", value: "− $12,480 provider-specific" },
      { label: "Overhead", value: "− $28,260 at 30% allocation" },
      { label: "Distribution", value: "$53,460 before partner draw" },
    ],
  },
];

export function PayrollModels() {
  const [selected, setSelected] = useState(0);
  const active = models[selected];

  return (
    <section
      id="models"
      className="py-10 sm:py-16 bg-slate-50 border-y border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Whatever your agreements actually say.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Compensation models are configured per clinician, so nobody has to
            be moved onto a formula that fits the software.
          </p>
        </div>

        {/* Model selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {models.map((model, idx) => {
            const Icon = model.icon;
            const isSelected = selected === idx;
            return (
              <button
                key={model.id}
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
                  {model.name}
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

            {/* Worked calculation */}
            <div className="lg:col-span-6 bg-slate-50 text-slate-700 rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between gap-2 text-brand-teal font-bold text-[11px] border-b border-slate-200 pb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sample calculation
                </span>
                <span className="text-slate-500 font-normal normal-case">
                  illustrative
                </span>
              </div>
              <div className="space-y-2.5 pt-1">
                {active.calc.map((row) => (
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
