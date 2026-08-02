"use client";

import { motion } from "framer-motion";

interface MedicalWaveformProps {
  className?: string;
  color?: string;
  bars?: number;
}

export function MedicalWaveform({
  className = "",
  color = "bg-brand-aqua",
  bars = 16,
}: MedicalWaveformProps) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => {
        // Create a pseudo-random looking but deterministic wave pattern
        const minScale = 0.2 + (Math.sin(i) * 0.1);
        const maxScale = 0.6 + (Math.cos(i * 1.5) * 0.4);
        
        return (
          <motion.div
            key={i}
            className={`w-[3px] rounded-full ${color}`}
            style={{
              height: "24px",
              transformOrigin: "center",
            }}
            animate={{
              scaleY: [minScale, maxScale, minScale],
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        );
      })}
    </div>
  );
}
