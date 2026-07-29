"use client";

import { motion } from "framer-motion";
import { Check, FileSearch, ShieldCheck, UserRoundCheck } from "lucide-react";

const checks = [
  { icon: FileSearch, title: "Evidence-backed coding", body: "Every code is tied to the clinical documentation that supports it." },
  { icon: UserRoundCheck, title: "Human-reviewed quality", body: "Experienced reviewers validate coding decisions before release." },
  { icon: ShieldCheck, title: "Audit-ready records", body: "Retain a clear history of review, updates, and coding rationale." },
];

export function QualityAssurance() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="surface-navy rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12"><span className="text-xs font-extrabold uppercase tracking-widest text-brand-aqua">Quality assurance</span><h2 className="text-4xl font-extrabold tracking-tight text-white mt-3 leading-tight">Coding you can stand behind.</h2><p className="text-base text-slate-300 leading-relaxed mt-5">Quality is not a final spot check. It is a visible part of every coded encounter, from chart context through to billing handoff.</p><div className="mt-8 flex items-center gap-3 text-sm font-bold text-white"><span className="w-8 h-8 rounded-full bg-brand-aqua/15 flex items-center justify-center"><Check className="w-4 h-4 text-brand-aqua" /></span>Built for compliance and audit readiness</div></div>
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 lg:p-10 grid gap-4 content-center">
            {checks.map((check, index) => { const Icon = check.icon; return <motion.div key={check.title} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200"><div className="w-10 h-10 shrink-0 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center"><Icon className="w-5 h-5" /></div><div><h3 className="text-base font-bold text-brand-ink">{check.title}</h3><p className="text-sm text-slate-600 leading-relaxed mt-1">{check.body}</p></div></motion.div>; })}
          </div>
        </div>
      </div>
    </section>
  );
}
