"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileText,
  Check,
  ChevronRight,
} from "lucide-react";

interface DocHeroProps {
  onOpenDemo: () => void;
}

/* Layered note cards behind the primary one — deterministic values so
   server and client markup match. */
const STACK = [
  { rotate: -4, x: -14, y: 16, opacity: 0.35 },
  { rotate: -2, x: -7, y: 8, opacity: 0.6 },
];

export function DocHero({ onOpenDemo }: DocHeroProps) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-hero-grid">
      <div className="page-container">
        {/* Breadcrumb */}
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
          <span className="text-brand-ink">Medical Documentation</span>
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
              Medical Documentation
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
              Every note written,{" "}
              <span className="text-accent accent-underline">
                reviewed, and ready.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Ambient AI drafts the note during the visit. A certified clinical
              reviewer checks it before it reaches your EHR. You sign and move
              on to the next patient.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: UserCheck, label: "Human-reviewed accuracy" },
                { icon: ShieldCheck, label: "HIPAA compliant" },
                { icon: Check, label: "EHR-ready output" },
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
                className="px-8 py-4 rounded-full bg-brand-teal text-white text-base font-bold tracking-wide shadow-xs  hover:border-brand-teal-200 hover: hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#process"
                className="px-8 py-4 rounded-full bg-white/80 border border-slate-200 text-brand-ink hover:text-brand-teal hover:border-brand-teal-200 text-base font-bold shadow-xs hover:border-brand-teal-200 transition-all flex items-center justify-center gap-2"
              >
                See how it works
              </a>
            </div>
          </motion.div>

          {/* Illustration: a note being drafted, reviewed, then signed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              {/* Stacked paper behind */}
              {STACK.map((s, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-xs"
                  style={{
                    transform: `rotate(${s.rotate}deg) translate(${s.x}px, ${s.y}px)`,
                    opacity: s.opacity,
                  }}
                />
              ))}

              {/* Primary note card */}
              <div className="relative bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-teal mb-0.5">
                      SOAP Note
                    </div>
                    <div className="text-sm font-bold text-brand-ink">
                      Established patient follow-up
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-teal-50 text-brand-teal-deep border border-brand-teal-100 text-[10px] font-bold">
                    <Check className="w-3 h-3" />
                    MD Reviewed
                  </span>
                </div>

                <div className="space-y-3.5">
                  {[
                    {
                      label: "Subjective",
                      body: "58yo F reports improved exertional dyspnea since last visit. Denies chest pain, orthopnea, or lower-extremity edema.",
                    },
                    {
                      label: "Objective",
                      body: "BP 124/78, HR 68, SpO2 98% RA. Lungs clear to auscultation. No murmur, rub, or gallop.",
                    },
                    {
                      label: "Assessment",
                      body: "Non-ischemic cardiomyopathy, clinically improved on current regimen.",
                    },
                    {
                      label: "Plan",
                      body: "Continue Entresto 49/51mg BID. Repeat echo in 3 months. Return in 6 weeks.",
                    },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.5 + i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-brand-teal mb-1">
                        {row.label}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                        {row.body}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Codes + sync footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {["I50.22", "99214"].map((code) => (
                      <span
                        key={code}
                        className="px-2 py-0.5 rounded-md bg-brand-teal/10 text-brand-teal border border-brand-teal-100 text-[11px] font-mono font-bold"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Ready for EHR sync
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
