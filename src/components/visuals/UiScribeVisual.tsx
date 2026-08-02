"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export function UiScribeVisual() {
  return (
    <div className="w-full h-full min-h-[140px] bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-400/5 blur-2xl" />
      <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm text-blue-500">
        <Mic className="w-5 h-5" />
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-blue-400/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full border border-blue-400/20"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}
