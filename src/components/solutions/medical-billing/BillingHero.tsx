"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Check,
  CreditCard,
  ShieldCheck,
  SearchCheck,
  AlertTriangle,
} from "lucide-react";

interface BillingHeroProps {
  onOpenDemo: () => void;
}

/* The visual argument of this page is pre-submission scrubbing: the claim is
   shown mid-check, with one issue caught and resolved rather than denied. */
const scrubChecks = [
  { label: "Eligibility verified", state: "pass" as const },
  { label: "Modifier -25 justified", state: "pass" as const },
  { label: "Missing NDC on J3301", state: "fixed" as const },
  { label: "NCCI bundling cleared", state: "pass" as const },
];

export function BillingHero({ onOpenDemo }: BillingHeroProps) {
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
          <span className="text-brand-ink">Medical Billing</span>
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
              Medical Billing
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
              Fix the claim{" "}
              <span className="text-accent accent-underline">
                before the payer does.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Every claim is scrubbed against payer rules before it leaves your
              practice. What the scrub catches gets fixed in minutes — not
              worked as a denial six weeks later.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: SearchCheck, label: "Pre-submission scrubbing" },
                { icon: ShieldCheck, label: "Denials worked to resolution" },
                { icon: Check, label: "Full remittance reconciliation" },
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
                href="#lifecycle"
                className="px-8 py-4 rounded-full bg-white/80 border border-slate-200 text-brand-ink hover:text-brand-teal hover:border-brand-teal-200 text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2"
              >
                See the claim lifecycle
              </a>
            </div>
          </motion.div>

          {/* Illustration: a claim being scrubbed pre-submission */}
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
                      Claim 837P
                    </div>
                    <div className="text-sm font-bold text-brand-ink">
                      Pre-submission scrub
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint-50 text-mint-700 border border-mint-100 text-[10px] font-bold">
                    <Check className="w-3 h-3" />
                    Clean
                  </span>
                </div>

                {/* Claim lines */}
                <div className="space-y-2 mb-5">
                  {[
                    { code: "99214", mod: "-25", amount: "$168.00" },
                    { code: "20610", mod: "-RT", amount: "$142.00" },
                    { code: "J3301", mod: "×4", amount: "$38.40" },
                  ].map((line, i) => (
                    <motion.div
                      key={line.code}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2"
                    >
                      <span className="font-mono text-sm font-bold text-brand-teal">
                        {line.code}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-500">
                        {line.mod}
                      </span>
                      <span className="ml-auto font-mono text-xs font-bold text-brand-ink">
                        {line.amount}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Scrub results */}
                <div className="space-y-2">
                  {scrubChecks.map((check, i) => (
                    <motion.div
                      key={check.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-2.5 text-[11px]"
                    >
                      {check.state === "fixed" ? (
                        <span className="w-5 h-5 rounded-full bg-coral-50 text-coral-700 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-mint-50 text-mint-700 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <span className="text-slate-600">{check.label}</span>
                      {check.state === "fixed" && (
                        <span className="ml-auto px-1.5 py-0.5 rounded bg-coral-50 text-coral-700 text-[10px] font-bold">
                          Caught &amp; fixed
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Ready to submit
                  </span>
                  <span className="font-mono text-sm font-extrabold text-brand-ink">
                    $348.40
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
