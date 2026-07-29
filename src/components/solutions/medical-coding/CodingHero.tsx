"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  BadgeCheck,
} from "lucide-react";

interface CodingHeroProps {
  onOpenDemo: () => void;
}

const codeRows = [
  { system: "ICD-10-CM", code: "M17.11", label: "Primary OA, right knee" },
  { system: "CPT", code: "20610", label: "Major joint injection" },
  { system: "HCPCS", code: "J3301", label: "Triamcinolone acetonide" },
];

export function CodingHero({ onOpenDemo }: CodingHeroProps) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-white bg-hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-8"
        >
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link href="/#platform" className="hover:text-brand-teal transition-colors">Solutions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-brand-ink">Medical Coding</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ink/5 border border-slate-200 text-brand-ink text-xs font-semibold">
              <BadgeCheck className="w-3.5 h-3.5 text-brand-teal" />
              <span>Medical Coding</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
              Code with confidence. <span className="text-accent accent-underline">Get paid faster.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              NOTENRA turns complete clinical context into accurate ICD-10-CM, CPT, and HCPCS coding, then puts every claim through human review before it moves downstream.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: UserCheck, label: "Human-reviewed quality" },
                { icon: ShieldCheck, label: "Compliance checks built in" },
                { icon: Check, label: "Audit-ready rationale" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-brand-ink shadow-2xs">
                  <Icon className="w-3.5 h-3.5 text-brand-teal" />
                  {label}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button onClick={onOpenDemo} className="px-8 py-4 rounded-full surface-navy text-white text-base font-bold tracking-wide shadow-xs hover:bg-brand-teal hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                <span>See Coding in Action</span>
                <ArrowRight className="w-5 h-5 text-brand-aqua transition-transform group-hover:translate-x-1" />
              </button>
              <a href="#workflow" className="px-8 py-4 rounded-full bg-white border border-slate-200 text-brand-ink hover:text-brand-teal hover:border-brand-teal-200 text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2">
                See the workflow
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <div aria-hidden="true" className="absolute -inset-4 bg-brand-teal/5 rounded-[2rem] animate-pulse-glow" />
              <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-teal mb-0.5">Encounter coding</div>
                    <div className="text-sm font-bold text-brand-ink">Right knee procedure</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint-50 text-mint-700 border border-mint-100 text-[10px] font-bold">
                    <Check className="w-3 h-3" /> Ready to submit
                  </span>
                </div>
                <div className="space-y-3">
                  {codeRows.map((row, index) => (
                    <motion.div
                      key={row.code}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.45 + index * 0.12 }}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3"
                    >
                      <span className="w-20 shrink-0 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{row.system}</span>
                      <span className="font-mono text-sm font-bold text-brand-teal">{row.code}</span>
                      <span className="min-w-0 flex-1 text-xs text-slate-600 truncate">{row.label}</span>
                      <Check className="w-4 h-4 text-mint-700 shrink-0" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-3 gap-2">
                  {[["Documentation", "Matched"], ["Modifier", "Verified"], ["Review", "Complete"]].map(([label, value]) => (
                    <div key={label} className="text-center">
                      <div className="text-[10px] text-slate-500">{label}</div>
                      <div className="text-xs font-bold text-brand-ink mt-0.5">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
