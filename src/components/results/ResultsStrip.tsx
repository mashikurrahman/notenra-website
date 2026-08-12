"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, Users } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "70%",
    label: "Less charting time",
    accent: "text-brand-teal",
  },
  {
    icon: Target,
    value: "98.2%",
    label: "Coding accuracy",
    accent: "text-brand-teal",
  },
  {
    icon: TrendingUp,
    value: "3.5hrs",
    label: "Returned daily per physician",
    accent: "text-brand-teal",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active providers",
    accent: "text-brand-teal",
  },
];

/** A compact, high-impact metrics strip that sits between Security and
    the brand motto — provides social proof and a natural visual break. */
export function ResultsStrip() {
  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,164,106,0.04),transparent_70%)] pointer-events-none" />

      <div className="page-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-3">
            Proven Results
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            The numbers speak for themselves.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/8 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-4.5 h-4.5 text-brand-teal" />
                </div>
                <p className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 ${metric.accent}`}>
                  {metric.value}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
