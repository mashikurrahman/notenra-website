"use client";

import { motion } from "framer-motion";
import { Clock, Zap, CheckCircle2, TrendingUp, Heart } from "lucide-react";

/* Figures are solid, not gradient-clipped: a gradient across a short numeral
   washes out its weight. Tiles stay one colour — a row meant to be scanned
   quickly does not want a second hue competing in it. */
const metrics = [
  { value: "2.8 Hours", label: "Saved per physician / day", icon: Clock },
  { value: "< 45 Seconds", label: "Documentation turnaround", icon: Zap },
  { value: "99.4%", label: "Coding accuracy rate", icon: CheckCircle2 },
  { value: "+38%", label: "First-pass claim yield", icon: TrendingUp },
  { value: "98% CSAT", label: "Physician satisfaction", icon: Heart },
] as const;

/**
 * Floating stat panel. Straddles the hero band and the section beneath it via
 * a negative top margin, so the two grounds are stitched together by one card
 * instead of meeting at a bare seam.
 */
export function StatsFloat() {
  return (
    <div className="relative z-10 -mt-16 sm:-mt-24 lg:-mt-[188px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 bg-white px-6 py-10 shadow-lg sm:px-10 sm:py-12">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">
            Engineered for clinical excellence.
          </h2>
          <p className="mt-3 text-base font-normal text-slate-600">
            Trusted by independent physicians and medical groups nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-brand-teal-200"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-deep transition-colors group-hover:bg-brand-teal group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mb-1 text-2xl font-extrabold tracking-tight text-brand-ink">
                  {m.value}
                </div>
                <div className="text-sm font-bold leading-snug text-brand-ink">
                  {m.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
