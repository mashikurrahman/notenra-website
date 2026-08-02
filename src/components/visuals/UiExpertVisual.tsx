"use client";

import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";

export function UiExpertVisual() {
  return (
    <div className="w-full h-full min-h-[140px] bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl" />
      <motion.div 
        className="flex flex-col items-center gap-2 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-full border border-indigo-100 shadow-sm flex items-center justify-center text-indigo-500">
            <UserCheck className="w-5 h-5" />
          </div>
          <motion.div 
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          />
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Audited & Verified
        </div>
      </motion.div>
    </div>
  );
}
