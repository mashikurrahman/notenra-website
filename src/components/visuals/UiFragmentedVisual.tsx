"use client";

import { motion } from "framer-motion";
import { Monitor, FileText, Database } from "lucide-react";

export function UiFragmentedVisual() {
  return (
    <div className="w-full h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden relative mb-5">
      <div className="absolute inset-0 bg-blue-400/5" />
      
      <div className="flex items-center justify-center gap-3 relative z-10">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-white border border-blue-100 shadow-sm flex items-center justify-center text-blue-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Monitor className="w-4 h-4" />
        </motion.div>
        
        <motion.div 
          className="w-1 h-1 rounded-full bg-blue-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="w-1 h-1 rounded-full bg-blue-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <motion.div 
          className="w-1 h-1 rounded-full bg-blue-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />

        <motion.div 
          className="w-10 h-10 rounded-lg bg-white border border-blue-100 shadow-sm flex items-center justify-center text-blue-500 relative"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <Database className="w-4 h-4" />
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          />
        </motion.div>

        <motion.div 
          className="w-1 h-1 rounded-full bg-blue-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
        />
        <motion.div 
          className="w-1 h-1 rounded-full bg-blue-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }}
        />

        <motion.div 
          className="w-10 h-10 rounded-lg bg-white border border-blue-100 shadow-sm flex items-center justify-center text-blue-600"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <FileText className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}
