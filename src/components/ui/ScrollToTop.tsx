"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/* Hysteresis, same reasoning as the header pill: a single threshold makes the
   button flicker in and out when the user rests mid-scroll. Appears roughly
   one viewport down, which is late enough that it never competes with the
   hero's own calls to action. */
const SHOW_AT = 600;
const HIDE_AT = 320;

/* Sits below the header (z-40) and the demo modal (z-50) on purpose — an
   overlay must never be obscured by a utility control. */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      setIsVisible((prev) => (prev ? y > HIDE_AT : y > SHOW_AT));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    // Sync immediately: a reload at depth or a #hash landing should already
    // show the button rather than waiting for the first scroll event.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    /* The explicit behavior wins over `scroll-behavior: smooth` in globals.css,
       which is the only way to honour a reduced-motion preference here. */
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 p-3 sm:p-3.5 rounded-full bg-brand-teal text-white shadow-lg border border-white/15 hover:bg-brand-teal-deep hover:scale-105 active:scale-95 transition-[background-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
