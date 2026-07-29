"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, ShieldCheck, UserCheck } from "lucide-react";

const steps = [
  {
    number: "01", title: "Clinical context arrives", icon: FileSearch,
    description: "Notes, orders, results, and procedures are assembled into one coding-ready view.",
    detail: "The full encounter matters. NOTENRA reads the record around the code so specificity is supported, not guessed.",
    checks: ["Diagnoses and procedures linked", "Supporting documentation surfaced", "Missing details flagged early"],
  },
  {
    number: "02", title: "Codes are mapped", icon: ClipboardCheck,
    description: "AI proposes ICD-10-CM, CPT, HCPCS, modifiers, and supporting rationale.",
    detail: "Code suggestions are grounded in the chart and checked against current code-set logic before a reviewer ever sees them.",
    checks: ["Specificity and laterality checked", "Modifier logic validated", "Bundling conflicts surfaced"],
  },
  {
    number: "03", title: "A coding expert reviews", icon: UserCheck,
    description: "A trained reviewer validates the final code selection and the evidence behind it.",
    detail: "Human review is built into the workflow for every coded encounter, giving your team a reliable second set of eyes.",
    checks: ["Clinical documentation reconciled", "Compliance rules cross-checked", "Final rationale retained"],
    highlight: true,
  },
  {
    number: "04", title: "The claim moves cleanly", icon: ShieldCheck,
    description: "Approved coding flows to billing with a complete audit trail and fewer preventable denials.",
    detail: "Clear codes, attached rationale, and exception handling give billing teams what they need before a claim goes out.",
    checks: ["Claim-ready code package", "Exceptions routed to the right team", "Audit history retained"],
  },
];

export function CodingWorkflow() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step.icon;

  return (
    <section id="workflow" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">A clean path from chart to claim.</h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">Every handoff is visible. Every decision is supportable.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            {steps.map((item, index) => {
              const StepIcon = item.icon;
              const selected = active === index;
              return (
                <button key={item.number} onClick={() => setActive(index)} aria-current={selected} className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${selected ? "bg-white border-brand-teal shadow-xs" : "bg-transparent border-slate-200 hover:bg-white hover:border-slate-300"}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? "surface-teal text-white" : "bg-white text-slate-400 border border-slate-200"}`}><StepIcon className="w-5 h-5" /></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Step {item.number}</span>{item.highlight && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-teal-50 text-brand-teal-deep">Human review</span>}</div>
                      <h3 className="text-lg font-bold text-brand-ink mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="absolute inset-x-0 top-0 h-1 surface-teal" />
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28 }} className="space-y-6">
                  <div className="flex items-center gap-3 pb-5 border-b border-slate-200">
                    <div className="w-11 h-11 rounded-xl surface-teal flex items-center justify-center text-white"><Icon className="w-5 h-5" /></div>
                    <div><div className="text-xs font-bold text-brand-teal uppercase tracking-wider">Stage {step.number}</div><h3 className="text-xl font-bold text-brand-ink">{step.title}</h3></div>
                  </div>
                  <p className="text-base text-slate-600 leading-relaxed">{step.detail}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {step.checks.map((check) => <div key={check} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-600 leading-relaxed"><CheckCircle2 className="w-4 h-4 text-mint-700 mb-2" />{check}</div>)}
                  </div>
                  <div className="flex items-center justify-between pt-2"><span className="text-xs text-slate-500">Step {active + 1} of {steps.length}</span><ArrowRight className="w-4 h-4 text-brand-teal" /></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
