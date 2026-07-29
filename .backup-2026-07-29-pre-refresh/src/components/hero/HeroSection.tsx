"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export function HeroSection({ onOpenDemo }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 overflow-hidden bg-white bg-hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B3F60]/5 border border-[#1B3F60]/10 text-[#1B3F60] text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#0E7C93]" />
              <span>AI Scribe + Human Clinical Review</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B3F60] tracking-tight leading-[1.1]">
              Documentation that moves at the{" "}
              <span className="text-gradient-cyan">speed of care.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered documentation, coding, and billing - refined by healthcare experts, so physicians can focus on patients, not paperwork.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-navy text-white text-base font-bold tracking-wide shadow-xl shadow-[#1B3F60]/20 hover:shadow-2xl hover:shadow-[#0E7C93]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5 text-[#4ACCCE] transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#platform"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 border border-slate-200/90 text-[#1B3F60] hover:text-[#0E7C93] hover:border-[#0E7C93]/40 text-base font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <Play className="w-4 h-4 text-[#0E7C93] fill-[#0E7C93] group-hover:scale-110 transition-transform" />
                <span>See Platform</span>
              </a>
            </div>
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
