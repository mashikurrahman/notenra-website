"use client";

import { motion } from "framer-motion";

export function UiBurnoutVisual() {
  return (
    <div className="w-full h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden relative mb-5">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />
      <div className="flex items-center gap-1.5 px-4 w-full opacity-60">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-red-500/40 rounded-full"
            animate={{
              height: ["12px", i % 2 === 0 ? "40px" : "24px", "12px"],
              backgroundColor: ["rgba(239, 68, 68, 0.4)", "rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.4)"]
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      <motion.div 
        className="absolute right-4 px-2.5 py-1 bg-white shadow-sm border border-red-100 rounded-md text-[9px] font-bold text-red-500 uppercase tracking-wider"
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Critical Level
      </motion.div>
    </div>
  );
}
