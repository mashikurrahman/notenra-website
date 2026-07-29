"use client";

import { motion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

export function HeroSection() {
  return (
    // No longer the first block on the page. HeroBanner above owns the header
    // clearance, the page's single h1, and the primary calls to action — so
    // this section drops to normal padding and carries no buttons of its own.
    // It also takes the grey ground so the two do not read as one block.
    <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ink/5 border border-slate-200 text-brand-ink text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-brand-teal" />
              <span>AI Scribe + Human Clinical Review</span>
            </div>

            {/* Demoted to h2 — HeroBanner now carries the page's only h1. */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight leading-[1.1] text-balance">
              Documentation that moves at the{" "}
              <span className="text-accent">speed of care.</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered documentation, coding, and billing - refined by
              healthcare experts, so physicians can focus on patients, not
              paperwork.
            </p>
          </motion.div>

          {/* Right Column: Live Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
