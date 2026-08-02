"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Check,
  BarChart3,
  Calculator,
  Eye,
} from "lucide-react";

interface PayrollHeroProps {
  onOpenDemo: () => void;
}

/* Illustrative figures only — this is a sample statement, not a benchmark.
   The point of the visual is that every line is traceable to its source. */
const statementLines = [
  { label: "Base salary", detail: "Monthly, per agreement", amount: "$18,750" },
  { label: "wRVU production", detail: "412 wRVU × $46.20", amount: "$19,034" },
  { label: "Production threshold", detail: "Base credit — 380 wRVU", amount: "−$17,556" },
  { label: "Quality incentive", detail: "4 of 5 measures met", amount: "$1,200" },
];

export function PayrollHero({ onOpenDemo }: PayrollHeroProps) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-hero-grid">
      <div className="page-container">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-8"
        >
          <Link href="/" className="hover:text-brand-teal transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link
            href="/#platform"
            className="hover:text-brand-teal transition-colors"
          >
            Solutions
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-brand-ink">Payroll Management</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Payroll Management
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
              Compensation your physicians{" "}
              <span className="text-accent accent-underline">
                can actually verify.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Production, RVUs, and incentive terms are calculated from the same
              encounter data your claims come from — so every line on a
              compensation statement traces back to the work that earned it.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Calculator, label: "wRVU & production attribution" },
                { icon: Eye, label: "Statements clinicians can audit" },
                { icon: Check, label: "Payroll-ready output" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-brand-ink shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-brand-teal" />
                  {label}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenDemo}
                className="px-8 py-4 rounded-full bg-brand-teal text-white text-base font-bold tracking-wide shadow-xs hover:bg-brand-teal hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#how"
                className="px-8 py-4 rounded-full bg-white/80 border border-slate-200 text-brand-ink hover:text-brand-teal hover:border-brand-teal-200 text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2"
              >
                See how it calculates
              </a>
            </div>
          </motion.div>

          {/* Illustration: a compensation statement with every line sourced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="relative bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-teal mb-0.5">
                      Compensation statement
                    </div>
                    <div className="text-sm font-bold text-brand-ink">
                      Cardiology — March period
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-teal-50 text-brand-teal-deep border border-brand-teal-100 text-[10px] font-bold">
                    <Check className="w-3 h-3" />
                    Reconciled
                  </span>
                </div>

                <div className="space-y-2.5">
                  {statementLines.map((line, i) => (
                    <motion.div
                      key={line.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.5 + i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-brand-ink">
                          {line.label}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {line.detail}
                        </div>
                      </div>
                      <span className="ml-auto font-mono text-xs font-bold text-brand-ink shrink-0">
                        {line.amount}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      Period total
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Every line traceable to source encounters
                    </div>
                  </div>
                  <span className="font-mono text-xl font-extrabold text-accent">
                    $21,428
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
