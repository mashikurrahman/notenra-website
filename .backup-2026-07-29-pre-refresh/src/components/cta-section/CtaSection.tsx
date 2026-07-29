"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, Stethoscope } from "lucide-react";

interface CtaSectionProps {
  onOpenDemo: () => void;
}

export function CtaSection({ onOpenDemo }: CtaSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-navy rounded-[2.5rem] p-8 sm:p-14 lg:p-20 text-white text-center relative overflow-hidden shadow-xl border border-[#4ACCCE]/15">

          {/* Ambient Glow Orbs - subtle, single accent */}
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#0E7C93]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Give your physicians their evenings back.
            </h2>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Join independent practices and medical groups using NOTENRA to eliminate administrative burnout.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-cyan text-white text-base font-bold tracking-wide shadow-xl shadow-[#0E7C93]/40 hover:shadow-2xl hover:shadow-[#4ACCCE]/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Book Your Demo</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/about#specialties"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 text-base font-bold transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-[#4ACCCE]" />
                <span>Explore Specialties</span>
              </Link>
            </div>

            {/* Reassurance Footer */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 pt-8 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4ACCCE]" />
                HIPAA Ready & BAA Included
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4ACCCE]" />
                15-Min Onboarding Setup
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#4ACCCE]" />
                No Long-Term Contracts
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
