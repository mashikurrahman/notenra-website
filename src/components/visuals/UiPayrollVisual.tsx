"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function UiPayrollVisual() {
  return (
    <div className="w-full h-full min-h-[140px] bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100 flex items-center justify-center p-4">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-2xl" />
      <motion.div 
        className="w-full bg-white p-3 rounded-lg shadow-sm border border-blue-100 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-bold text-brand-ink">wRVU Tracker</span>
        </div>
        <div className="flex items-end gap-1.5 h-8">
          {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
            <motion.div 
              key={i}
              className="flex-1 bg-blue-500/20 rounded-sm"
              initial={{ height: "10%" }}
              whileInView={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
            >
              <motion.div 
                className="w-full bg-blue-500 rounded-sm"
                initial={{ height: "0%" }}
                whileInView={{ height: "30%" }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
