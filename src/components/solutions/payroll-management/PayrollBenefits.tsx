"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Clock,
  Scale,
  Building2,
  ShieldCheck,
  Compass,
} from "lucide-react";

/* Directional rather than numeric: the size of the win depends entirely on
   how a practice calculates compensation today. Replace with measured
   figures per segment once they exist. */
const benefits = [
  {
    icon: Eye,
    stat: "Traceable",
    statLabel: "down to the encounter",
    title: "The number stops being contested",
    body: "When a clinician can drill from their total into the visits behind it, the monthly compensation conversation becomes short and factual.",
  },
  {
    icon: Clock,
    stat: "Hours",
    statLabel: "off every payroll close",
    title: "The spreadsheet month ends",
    body: "Attribution, thresholds, and tiers are calculated from source data instead of rebuilt by hand in a workbook nobody else can safely edit.",
  },
  {
    icon: Scale,
    stat: "Fewer",
    statLabel: "calculation errors",
    title: "Mistakes surface before payday",
    body: "Discrepancies are raised during review rather than discovered in a retroactive correction that damages trust either way.",
  },
  {
    icon: Building2,
    stat: "Every",
    statLabel: "site and entity in one view",
    title: "Multi-location groups reconcile",
    body: "Cross-site coverage, supervised mid-levels, and locum shifts are attributed to the right clinician and the right cost centre.",
  },
  {
    icon: Compass,
    stat: "Clear",
    statLabel: "cost per wRVU",
    title: "Leadership can plan with real numbers",
    body: "Production, compensation, and cost sit against each other, so recruiting and coverage decisions rest on evidence rather than instinct.",
  },
  {
    icon: ShieldCheck,
    stat: "Documented",
    statLabel: "for every review cycle",
    title: "Defensible when it is examined",
    body: "Each period retains its inputs, terms, approvals, and outputs — so a compensation question years later has a documented answer.",
  },
];

export function PayrollBenefits() {
  return (
    <section
      id="benefits"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-hero-grid opacity-40 pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
            Compensation intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-3">
            What changes for your practice.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Compensation stops being the most fragile spreadsheet in the
            building.
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
