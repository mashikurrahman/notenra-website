"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Calculator,
  ScrollText,
  Banknote,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Production data is attributed",
    lane: "Source data",
    icon: Activity,
    description:
      "Encounters, procedures, and coded claims are attributed to the clinician who performed the work — across every location and entity.",
    detail: {
      heading: "Credit lands with the right clinician",
      body: "Attribution is where most compensation disputes begin: shared visits, supervised mid-levels, cross-site coverage, and locum shifts. Each is resolved against the encounter record rather than a spreadsheet convention.",
      points: [
        "Shared and supervised visits attributed by rule",
        "Multi-site and multi-entity coverage separated",
        "wRVUs derived from the codes actually billed",
      ],
    },
  },
  {
    number: "02",
    title: "Your comp model is applied",
    lane: "Calculation",
    icon: Calculator,
    highlight: true,
    description:
      "Your agreements — not a vendor's template — drive the math: thresholds, tiers, conversion factors, guarantees, and quality bonuses.",
    detail: {
      heading: "The model you actually signed",
      body: "Compensation terms are configured per clinician, so tiered conversion factors, base guarantees, thresholds, and quality bonuses are calculated exactly as written in the agreement rather than approximated.",
      points: [
        "Per-clinician terms, not one shared formula",
        "Tiered rates and thresholds handled natively",
        "Mid-year term changes applied from their effective date",
      ],
    },
  },
  {
    number: "03",
    title: "Statements are produced",
    lane: "Transparency",
    icon: ScrollText,
    description:
      "Each clinician receives a statement that shows the figure and the arithmetic behind it, down to the encounters that produced it.",
    detail: {
      heading: "The end of the compensation argument",
      body: "When a physician can drill from a total into the encounters behind it, the monthly conversation stops being a dispute about the number and becomes a discussion about the work.",
      points: [
        "Every line drillable to source encounters",
        "Period-over-period comparison included",
        "Discrepancies raised before payroll runs, not after",
      ],
    },
  },
  {
    number: "04",
    title: "Payroll and reporting run",
    lane: "Handoff",
    icon: Banknote,
    description:
      "Approved figures are exported to your payroll provider, and the same data feeds the productivity reporting your leadership needs.",
    detail: {
      heading: "Feeds payroll, not replaces it",
      body: "NOTENRA calculates and documents compensation, then hands approved figures to the payroll or accounting system you already use. Your existing provider continues to handle disbursement and tax filing.",
      points: [
        "Export to your existing payroll provider",
        "Approval trail retained per period",
        "Productivity and cost reporting from the same figures",
      ],
    },
  },
];

export function PayrollProcess() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="how"
      className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            From encounter to paycheck, showing the work.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Four steps between the visit a clinician performed and the figure
            they are paid — with the arithmetic visible at every one.
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
