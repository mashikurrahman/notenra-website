"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BrandPreloader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only play on first visit of the browser session
    const hasVisited = sessionStorage.getItem("notenra_preloaded");
    if (!hasVisited) {
      setIsVisible(true);
    }

    // Keyboard escape listener to bypass preloader instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        completePreload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const completePreload = () => {
    sessionStorage.setItem("notenra_preloaded", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-ink select-none overflow-hidden"
        >
          {/* Logo Reveal Video */}
          <div className="relative w-full max-w-[480px] aspect-video flex items-center justify-center p-4">
            <video
              src="/videos/logo-reveal.mp4"
              autoPlay
              muted
              playsInline
              onEnded={completePreload}
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>

          {/* Interactive bypass controls */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 0.9 }}
            onClick={completePreload}
            className="absolute bottom-8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/55 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all cursor-pointer"
          >
            Skip Intro [Esc]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
