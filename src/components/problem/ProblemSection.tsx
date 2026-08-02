"use client";

import { motion } from "framer-motion";
import { Flame, TrendingDown, Puzzle } from "lucide-react";

import { UiBurnoutVisual } from "../visuals/UiBurnoutVisual";
import { UiRevenueVisual } from "../visuals/UiRevenueVisual";
import { UiFragmentedVisual } from "../visuals/UiFragmentedVisual";

const problems = [
  {
    icon: Flame,
    bgClass: "bg-red-500/10",
    textClass: "text-red-500",
    title: "Burnout is systemic",
    description:
      "Administrative burden drives clinicians away from patient care faster than any clinical factor.",
    Visual: UiBurnoutVisual,
  },
  {
    icon: TrendingDown,
    bgClass: "bg-brand-teal/10",
    textClass: "text-brand-teal",
    title: "Revenue leaks silently",
    description:
      "Incomplete or miscoded documentation costs practices thousands in denied and undercoded claims.",
    Visual: UiRevenueVisual,
  },
  {
    icon: Puzzle,
    bgClass: "bg-blue-400/10",
    textClass: "text-blue-400",
    title: "Fragmented by design",
    description:
      "Physicians toggle between disconnected systems, duplicating effort at every point of the care workflow.",
    Visual: UiFragmentedVisual,
  },
];

export function ProblemSection() {
  return (
    <section className="pt-[160px] sm:pt-[180px] lg:pt-[140px] pb-10 sm:pb-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-slate-400 mb-6"
        >
          The Problem
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold leading-[1.08] tracking-tight text-brand-ink mb-5"
        >
          The cost of fragmented care is measurable.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-normal"
        >
          That&apos;s 2 to 3 hours of clinical data the patient never benefits
          from — time spent in front of a screen instead of at the bedside.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            const Visual = p.Visual;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-[20px] p-8 cursor-pointer transition-shadow hover:shadow-xl group"
              >
                <Visual />
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-6 ${p.bgClass} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`w-4 h-4 ${p.textClass}`} />
                </div>
                <h4 className="text-[17px] font-semibold text-brand-ink mb-3">
                  {p.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
