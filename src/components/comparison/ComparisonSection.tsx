"use client";

import { XCircle, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export function ComparisonSection() {
  const comparisonItems = [
    {
      metric: "Daily Documentation Time",
      traditional: "3.5+ hours spent after clinical hours ('Pajama Time')",
      notenra: "Saved 2.8 hours daily. Zero evening paperwork.",
    },
    {
      metric: "EHR Clicking & Data Entry",
      traditional: "Over 400 manual clicks and drop-down selections per visit",
      notenra: "100% ambient capture. Zero manual template typing.",
    },
    {
      metric: "Note Turnaround Time",
      traditional: "24 to 72 hours backlog delaying billing submissions",
      notenra: "Completed in under 45 seconds during or right after visit.",
    },
    {
      metric: "Medical Coding Accuracy",
      traditional: "Frequent downcoding or unbilled ICD-10/CPT codes",
      notenra: "99.4% precision with CMS & E/M compliance cross-checks.",
    },
    {
      metric: "Quality & Compliance Audit",
      traditional:
        "High exposure to denial audits and unverified AI hallucinations",
      notenra: "Dual-layer AI + Board-certified human clinical auditor layer.",
    },
    {
      metric: "Physician Satisfaction",
      traditional: "Severe clinical burnout and reduced patient face-time",
      notenra: "98% physician CSAT with 100% focus on patient care.",
    },
  ];

  return (
    <section
      id="why-notenra"
      className="py-10 sm:py-16 bg-slate-50 border-y border-slate-200 relative overflow-hidden"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Traditional documentation vs. NOTENRA
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Replacing manual EHR entry with an intelligent, invisible workflow.
          </p>
        </div>

        {/* Comparison Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Traditional Card */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div>
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                  Old Paradigm
                </div>
                <h3 className="text-2xl font-bold text-slate-700">
                  Traditional EHR Workflow
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-5">
              {comparisonItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">
                      {item.metric}
                    </span>
                    <span>{item.traditional}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NOTENRA Card (Light teal surface with a cyan accent rail) */}
          <div className="lg:col-span-6 bg-slate-50 border border-brand-teal-200 rounded-3xl p-8 space-y-6 shadow-xs  relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 surface-teal" />

            <div className="flex items-center justify-between pb-6 border-b border-brand-teal-100 relative z-10">
              <div>
                <div className="text-xs font-extrabold text-brand-teal uppercase tracking-widest mb-1">
                  Next-Gen Intelligence
                </div>
                <h3 className="text-2xl font-bold text-brand-ink">
                  NOTENRA Clinical Workflow
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full surface-teal text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-5 relative z-10">
              {comparisonItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-brand-teal-100 last:border-0 last:pb-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-ink block mb-0.5">
                      {item.metric}
                    </span>
                    <span>{item.notenra}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
