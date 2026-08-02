"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  Eye,
  Wallet,
  Users,
} from "lucide-react";

/* Directional rather than numeric on purpose. Clean-claim rate and days in
   A/R depend on payer mix, specialty, and the practice's starting point, so a
   single headline percentage would not hold across accounts. Swap these for
   audited per-segment figures once they are available. */
const benefits = [
  {
    icon: ShieldCheck,
    stat: "Fewer",
    statLabel: "denials to work at all",
    title: "Prevention beats appeal",
    body: "An appealed denial costs staff time and delays payment by weeks. Catching the same issue in the scrub costs a correction before submission.",
  },
  {
    icon: Clock,
    stat: "Shorter",
    statLabel: "days in accounts receivable",
    title: "Money stops sitting in A/R",
    body: "Clean claims pay on the first pass, and what does not is worked by age rather than discovered during a quarterly review.",
  },
  {
    icon: TrendingUp,
    stat: "Higher",
    statLabel: "first-pass acceptance",
    title: "More claims land the first time",
    body: "Payer-specific edits are applied before transmission, so the first submission is the one that gets paid.",
  },
  {
    icon: Eye,
    stat: "Full",
    statLabel: "visibility per claim",
    title: "You can see where the money is",
    body: "Every claim's status, history, and blocker is visible — not summarized in a monthly report you cannot act on.",
  },
  {
    icon: Wallet,
    stat: "Recovered",
    statLabel: "contractual underpayments",
    title: "Paid correctly, not just paid",
    body: "Remittances are checked line by line against your contracted rates, so silent underpayments get identified and appealed.",
  },
  {
    icon: Users,
    stat: "Less",
    statLabel: "administrative load on staff",
    title: "Your front office stops firefighting",
    body: "When the scrub prevents the denial, staff spend their day on patients and posting instead of payer phone queues.",
  },
];

export function BillingBenefits() {
  return (
    <section
      id="benefits"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-hero-grid opacity-40 pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
            Revenue cycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-3">
            What changes for your revenue.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            The work moves from chasing denials after the fact to preventing
            them before submission.
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
