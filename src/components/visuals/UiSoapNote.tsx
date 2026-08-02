"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function UiSoapNote({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card p-5 rounded-2xl w-[320px] shadow-2xl relative overflow-hidden group ${className}`}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-aqua animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-brand-ink/60">
            Auto-Generated
          </span>
        </div>
        <CheckCircle2 className="w-4 h-4 text-brand-aqua" />
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Subjective
          </h4>
          <p className="text-sm font-medium text-brand-ink leading-snug">
            Patient reports dull, aching pain in lower back, radiating to left leg.
            Started 3 days ago after lifting heavy boxes.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Objective
          </h4>
          <p className="text-sm font-medium text-brand-ink leading-snug">
            + Straight leg raise on left at 45 degrees. Normal reflexes patellar & Achilles.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
          <div className="h-6 px-2.5 rounded bg-brand-teal/10 text-brand-teal text-[11px] font-bold flex items-center">
            ICD-10: M54.5
          </div>
          <div className="h-6 px-2.5 rounded bg-brand-teal/10 text-brand-teal text-[11px] font-bold flex items-center">
            CPT: 99213
          </div>
        </div>
      </div>
    </motion.div>
  );
}
