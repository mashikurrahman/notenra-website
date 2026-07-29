"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, FileCheck2, ShieldCheck, TimerReset } from "lucide-react";

const benefits = [
  { icon: BadgeDollarSign, metric: "Fewer", label: "preventable denials", title: "Cleaner claims from the start", body: "Documentation, modifiers, and coding specificity are checked before they become downstream rework." },
  { icon: TimerReset, metric: "Faster", label: "path to reimbursement", title: "Billing gets a complete package", body: "Your revenue cycle team receives reviewed codes with clear rationale, ready for the next step." },
  { icon: FileCheck2, metric: "Clear", label: "coding rationale", title: "Every choice is traceable", body: "Retain the evidence, reviewer decision, and change history needed to understand every coded encounter." },
  { icon: ShieldCheck, metric: "Built", label: "for compliance", title: "Confidence under scrutiny", body: "Code selection and documentation are cross-checked with compliance and audit readiness in view." },
];

export function CodingBenefits() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <div className="lg:col-span-7"><span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Revenue integrity</span><h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight mt-3">More certainty in every coded encounter.</h2></div>
          <p className="lg:col-span-5 text-lg text-slate-600 leading-relaxed">The goal is not just faster code assignment. It is a workflow your clinical, coding, and revenue teams can trust together.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.07 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 h-full">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-5"><Icon className="w-5 h-5" /></div>
              <div className="text-2xl font-extrabold text-accent">{benefit.metric}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-0.5 mb-4">{benefit.label}</div>
              <h3 className="text-base font-bold text-brand-ink mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{benefit.body}</p>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}
