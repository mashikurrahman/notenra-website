"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Stethoscope } from "lucide-react";

interface HeroBannerProps {
  onOpenDemo: () => void;
  /**
   * Path to the clinician cutout, relative to /public — e.g. "/hero-clinician.png".
   * A transparent PNG/WebP works best: the figure is meant to sit on the arc
   * behind it and bleed off the bottom edge of the card.
   * Omitted → a neutral placeholder frame renders instead, so the layout is
   * still reviewable before the photograph exists.
   */
  imageSrc?: string;
  imageAlt?: string;
}

export function HeroBanner({
  onOpenDemo,
  imageSrc,
  imageAlt = "Clinician using NOTENRA during a patient visit",
}: HeroBannerProps) {
  return (
    // Full-bleed band: the soft wash IS the section ground, so the hero reads
    // as the top of the page rather than a card floating on it. Everything
    // below alternates white / grey off this.
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(115deg,#F2FAFA_0%,#F7FBFC_42%,#EEF6F9_100%)] pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-[200px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Sparkles */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[36%] top-[18%] hidden text-brand-teal/25 lg:block"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c.6 6.3 5.1 10.8 12 12-6.9 1.2-11.4 5.7-12 12-.6-6.3-5.1-10.8-12-12C6.9 10.8 11.4 6.3 12 0Z" />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[47%] top-[13%] hidden text-brand-teal/18 lg:block"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c.6 6.3 5.1 10.8 12 12-6.9 1.2-11.4 5.7-12 12-.6-6.3-5.1-10.8-12-12C6.9 10.8 11.4 6.3 12 0Z" />
            </svg>
          </span>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* ---------- Copy ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 pb-12 pt-6 lg:py-20"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 pl-2 pr-3.5 py-1.5 text-xs font-semibold text-brand-ink shadow-xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal text-white">
                  <Stethoscope className="h-3 w-3" />
                </span>
                Advanced Clinical Documentation
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-ink text-balance leading-[1.08] max-w-[13ch]">
                Less charting. More patients.
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-md">
                NOTENRA drafts every clinical note during the visit, and a
                certified reviewer checks it before it reaches your EHR.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full surface-teal px-7 py-3.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-brand-teal-deep hover:scale-[1.02] active:scale-[0.98] group"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#platform"
                  className="inline-flex items-center justify-center gap-3 text-sm font-bold text-brand-ink transition-colors hover:text-brand-teal group"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 shadow-xs transition-colors group-hover:border-brand-teal-200">
                    <Play className="h-3.5 w-3.5 fill-brand-teal text-brand-teal" />
                  </span>
                  Watch Overview
                </a>
              </div>
            </motion.div>

            {/* ---------- Figure ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-6 relative self-end w-full"
            >
              {/* Arc the figure stands against */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 aspect-square w-[86%] max-w-md rounded-full bg-[#E4F1F4]"
              />

              {/* Sweep line. Scoped to this column and drawn on a square
                  viewBox with uniform scaling, so the curve keeps its shape
                  instead of being stretched flat across the whole card. */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
                fill="none"
              >
                <path
                  d="M40 392C22 250 96 96 268 46"
                  stroke="#007F8B"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <circle
                  cx="40"
                  cy="392"
                  r="3.5"
                  fill="#007F8B"
                  fillOpacity="0.3"
                />
              </svg>

              {/* Floating stat pill */}
              <div className="absolute right-4 sm:right-8 top-6 z-20 rounded-full bg-white border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-xs">
                <span className="font-extrabold text-brand-teal">45s</span>{" "}
                average note
              </div>

              <div className="relative z-10 flex h-[340px] sm:h-[420px] lg:h-[480px] items-end justify-center">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={620}
                    height={780}
                    priority
                    className="h-full w-auto object-contain object-bottom"
                  />
                ) : (
                  /* Placeholder — replace by passing `imageSrc` from page.tsx.
                     Deliberately plain so it never reads as finished art. */
                  <div className="mb-10 flex w-[70%] max-w-xs flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-teal-200 bg-white/70 px-6 py-10 text-center">
                    <Stethoscope className="h-7 w-7 text-brand-teal-200" />
                    <p className="text-xs font-semibold text-slate-500">
                      Clinician photo goes here
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      Add a transparent cutout to{" "}
                      <code className="font-mono">/public</code> and pass{" "}
                      <code className="font-mono">imageSrc</code>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
