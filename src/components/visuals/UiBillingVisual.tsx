"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function UiBillingVisual() {
  return (
    <div className="w-full h-full min-h-[140px] bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 blur-2xl" />
      <motion.div 
        className="w-full bg-white p-3 rounded-lg shadow-sm border border-emerald-100 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-brand-ink">Claim Scrubbed</span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
          <span>Modifiers Validated</span>
          <span className="text-emerald-500 font-bold">100%</span>
        </div>
      </motion.div>
    </div>
  );
}
