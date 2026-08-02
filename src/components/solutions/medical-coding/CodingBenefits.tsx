"use client";

import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  TimerReset,
  FileCheck2,
  ShieldCheck,
  Scale,
  Users,
} from "lucide-react";

/* Deliberately directional rather than numeric. Coding outcomes depend on
   payer mix, specialty, and the practice's baseline, so a hard percentage
   here would be a claim we cannot stand behind on every account. Replace
   with audited per-segment figures once they exist. */
const benefits = [
  {
    icon: BadgeDollarSign,
    stat: "Fewer",
    statLabel: "preventable denials",
    title: "Cleaner claims from the start",
    body: "Documentation support, coding specificity, and modifier logic are checked before they can turn into downstream rework.",
  },
  {
    icon: TimerReset,
    stat: "Faster",
    statLabel: "path to reimbursement",
    title: "Billing gets a complete package",
    body: "Your revenue cycle team receives reviewed codes with rationale attached, ready for submission instead of clarification.",
  },
  {
    icon: FileCheck2,
    stat: "Clear",
    statLabel: "coding rationale",
    title: "Every choice is traceable",
    body: "The evidence, the reviewer's decision, and the change history stay with the encounter — so any code can be explained months later.",
  },
  {
    icon: ShieldCheck,
    stat: "Built",
    statLabel: "for compliance",
    title: "Confidence under scrutiny",
    body: "Code selection and supporting documentation are cross-checked with audit readiness in view, not reconstructed when a request arrives.",
  },
  {
    icon: Scale,
    stat: "Consistent",
    statLabel: "across coders and sites",
    title: "One standard, not ten habits",
    body: "The same rules apply to every encounter regardless of who codes it, which removes the variation that makes audits unpredictable.",
  },
  {
    icon: Users,
    stat: "Scales",
    statLabel: "with encounter volume",
    title: "Capacity without a hiring cycle",
    body: "Volume spikes, vacations, and turnover stop dictating your coding backlog — throughput moves with the automated pass, not headcount.",
  },
];

export function CodingBenefits() {
  return (
    <section
      id="benefits"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-hero-grid opacity-40 pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
            Revenue integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-3">
            More certainty in every coded encounter.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            The goal is not faster code assignment. It is a workflow your
            clinical, coding, and revenue teams can trust together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-brand-teal-200 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-2xl surface-teal text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-all mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-extrabold tracking-tight text-accent">
                    {b.stat}
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                    {b.statLabel}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-ink mb-2 group-hover:text-brand-teal transition-colors">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {b.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
