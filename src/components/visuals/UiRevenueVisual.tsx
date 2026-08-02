"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export function UiRevenueVisual() {
  return (
    <div className="w-full h-24 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-end overflow-hidden relative mb-5 px-4 pt-3 pb-2">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/10 to-transparent" />
      
      <div className="flex justify-between items-start w-full relative z-10 mb-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Est. Leakage
        </span>
        <motion.div 
          className="flex items-center gap-1 text-brand-teal bg-brand-teal/10 px-1.5 py-0.5 rounded text-[10px] font-bold"
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowDownRight className="w-3 h-3" />
          $12.4k
        </motion.div>
      </div>

      <div className="flex items-end justify-between gap-2 w-full h-10 mt-2">
        {[40, 65, 45, 80, 50, 95].map((h, i) => (
          <motion.div
            key={i}
            className="w-full bg-brand-teal/20 rounded-t-sm"
            initial={{ height: "10%" }}
            whileInView={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          >
            <motion.div 
              className="w-full bg-brand-teal rounded-t-sm"
              initial={{ height: "0%" }}
              whileInView={{ height: "40%" }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
