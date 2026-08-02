"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function UiCodingSuggestion() {
  return (
    <div className="w-full h-full min-h-[140px] bg-slate-50 rounded-xl p-4 relative overflow-hidden border border-slate-100 flex flex-col justify-center">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-2xl transform -translate-x-8 translate-y-8" />
      
      <motion.div 
        className="glass-card bg-white/90 p-3 rounded-lg shadow-sm border border-brand-teal/10 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5 text-brand-teal">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Suggested</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">98% Match</span>
        </div>
        
        <div className="flex gap-2 mb-1">
          <span className="px-1.5 py-0.5 rounded bg-brand-ink/5 text-brand-ink text-[10px] font-bold">
            99214
          </span>
          <span className="px-1.5 py-0.5 rounded bg-brand-ink/5 text-brand-ink text-[10px] font-bold">
            J45.909
          </span>
        </div>
        
        <p className="text-[10px] text-slate-500 leading-tight">
          Based on 25 mins of complex decision making and asthma exacerbation protocol.
        </p>
      </motion.div>
    </div>
  );
}
