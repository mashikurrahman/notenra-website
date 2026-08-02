"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  FileSearch,
  UserRoundCheck,
  ShieldCheck,
  History,
} from "lucide-react";

const contrasts = [
  {
    point: "Review coverage",
    others: "A percentage of encounters audited after submission",
    notenra: "Every encounter reviewed by a certified coder before it goes out",
  },
  {
    point: "Where errors surface",
    others: "In the denial, weeks later, as rework for the billing team",
    notenra: "In the coding pass, before the claim is ever created",
  },
  {
    point: "Rationale",
    others: "Reconstructed from memory when an audit request arrives",
    notenra: "Recorded with the encounter at the moment the code is chosen",
  },
  {
    point: "Under-coding",
    others: "Unmeasured — only over-coding gets attention",
    notenra: "Flagged in both directions, so documented work is not left unbilled",
  },
  {
    point: "Consistency",
    others: "Varies by which coder happened to pick up the encounter",
    notenra: "One rule set applied across every coder, site, and specialty",
  },
];

const assurances = [
  {
    icon: FileSearch,
    label: "Evidence-backed coding",
    detail: "Every code tied to the documentation supporting it",
  },
  {
    icon: UserRoundCheck,
    label: "Certified reviewers",
    detail: "CPC / CCS-credentialed coders on every encounter",
  },
  {
    icon: ShieldCheck,
    label: "Compliance cross-checks",
    detail: "NCCI, LCD, and payer rules applied pre-submission",
  },
  {
    icon: History,
    label: "Audit-ready history",
    detail: "Review decisions and changes retained in full",
  },
];

export function QualityAssurance() {
  return (
    <section
      id="quality"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Coding you can stand behind.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Quality is not a spot check at the end. It is a visible part of
            every coded encounter, from chart context to billing handoff.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="pb-6 border-b border-slate-200">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                Retrospective auditing
              </div>
              <h3 className="text-2xl font-bold text-slate-700">
                Catch it after the denial
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
                Prevent it before submission
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

        {/* Assurance strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assurances.map((a, idx) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
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
                  {a.label}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {a.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
