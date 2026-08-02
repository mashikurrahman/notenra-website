"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  ShieldCheck,
  Lock,
  History,
  UserCog,
  ArrowRight,
} from "lucide-react";

const contrasts = [
  {
    point: "Where the math lives",
    others: "A workbook one person understands and nobody dares edit",
    notenra: "Configured terms applied to source data, visible to everyone",
  },
  {
    point: "Production figures",
    others: "Exported, pasted, and reconciled by hand each period",
    notenra: "Derived from the codes actually billed, updated continuously",
  },
  {
    point: "When errors appear",
    others: "In a retroactive correction after the clinician was paid",
    notenra: "In review, before the period is approved and exported",
  },
  {
    point: "Answering a query",
    others: "Rebuilding the calculation to explain a single number",
    notenra: "Drilling from the total into the encounters behind it",
  },
  {
    point: "Changing a term",
    others: "A new tab, a new formula, and a new source of drift",
    notenra: "Effective-dated terms with prior periods left intact",
  },
];

const controls = [
  {
    icon: ShieldCheck,
    label: "HIPAA compliant",
    detail: "BAA executed with every practice",
  },
  {
    icon: Lock,
    label: "Role-based access",
    detail: "Compensation visible only to those entitled to it",
  },
  {
    icon: History,
    label: "Period audit trail",
    detail: "Inputs, terms, and approvals retained per period",
  },
  {
    icon: UserCog,
    label: "Approval workflow",
    detail: "Nothing exports without a recorded sign-off",
  },
];

/* Stated plainly because getting this wrong is expensive for a practice:
   NOTENRA calculates and documents compensation. It is not a payroll bureau
   and does not disburse funds or file employment taxes. */
const scope = {
  notenra: [
    "Attribute production to the right clinician",
    "Apply each clinician's compensation terms",
    "Produce statements clinicians can audit",
    "Retain approvals and period documentation",
    "Export approved figures for payment",
  ],
  provider: [
    "Disburse pay to clinicians and staff",
    "Withhold and file employment taxes",
    "Issue W-2s, 1099s, and year-end filings",
    "Administer benefits and deductions",
    "Maintain registration in each jurisdiction",
  ],
};

export function PayrollWhyNotenra() {
  return (
    <section
      id="why"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Better than the spreadsheet it replaces.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Most groups calculate physician compensation in a workbook that one
            person maintains. That works until it does not.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="pb-6 border-b border-slate-200">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                Spreadsheet-based comp
              </div>
              <h3 className="text-2xl font-bold text-slate-700">
                One workbook, one owner
              </h3>
            </div>

            <div className="space-y-5">
              {contrasts.map((item) => (
                <div
                  key={item.point}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">
                      {item.point}
                    </span>
                    <span>{item.others}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-brand-teal-200 rounded-3xl p-8 space-y-6 shadow-xs relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 surface-teal" />

            <div className="pb-6 border-b border-brand-teal-100 relative z-10">
              <div className="text-xs font-extrabold text-brand-teal uppercase tracking-widest mb-1">
                NOTENRA
              </div>
              <h3 className="text-2xl font-bold text-brand-ink">
                Configured terms, sourced data
              </h3>
            </div>

            <div className="space-y-5 relative z-10">
              {contrasts.map((item) => (
                <div
                  key={item.point}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-brand-teal-100 last:border-0 last:pb-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-ink block mb-0.5">
                      {item.point}
                    </span>
                    <span>{item.notenra}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scope: what this replaces and what it does not */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 mb-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
              Where the line sits
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mt-2">
              We calculate compensation. Your payroll provider still pays it.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              NOTENRA is not a payroll bureau. It determines and documents what
              each clinician has earned, then hands approved figures to the
              provider who disburses pay and files employment taxes — so you
              keep the payroll relationship you already have.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 bg-white border border-brand-teal-200 rounded-2xl p-6 shadow-xs">
              <div className="text-xs font-extrabold text-brand-teal uppercase tracking-widest mb-4">
                NOTENRA does this
              </div>
              <div className="space-y-3">
                {scope.notenra.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                Your payroll provider keeps this
              </div>
              <div className="space-y-3">
                {scope.provider.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {controls.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-brand-teal-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-brand-ink mb-1">
                  {c.label}
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  {c.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
