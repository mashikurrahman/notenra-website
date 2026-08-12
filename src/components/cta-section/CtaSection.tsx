"use client";

import Link from "next/link";
import { useDemo } from "@/components/demo-modal/DemoProvider";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

interface Assurance {
  icon: LucideIcon;
  label: string;
}

interface CtaSectionProps {
  /* Optional: falls back to <DemoProvider> context, which is what lets the
     pages rendering this stay server components. */
  onOpenDemo?: () => void;
  /** Small label above the headline — grounds the CTA in the page it closes. */
  eyebrow?: string;
  headline: string;
  /** Closing phrase of the headline, rendered in the brand accent. */
  headlineAccent?: string;
  subhead: string;
  primaryLabel?: string;
  secondary?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  assurances?: Assurance[];
  /** Section ground. Each page sets its own white/grey rhythm. */
  tone?: "white" | "grey";
}

const DEFAULT_ASSURANCES: Assurance[] = [
  { icon: ShieldCheck, label: "HIPAA Ready & BAA Included" },
  { icon: CheckCircle2, label: "15-Min Onboarding Setup" },
  { icon: Clock, label: "No Long-Term Contracts" },
];

/* Every prop below is content, not layout: the closing block keeps one
   shape across the site while each page argues its own case. A CTA that
   repeats verbatim on three pages reads as boilerplate and gets skipped. */
export function CtaSection({
  onOpenDemo,
  eyebrow,
  headline,
  headlineAccent,
  subhead,
  primaryLabel = "Book Your Demo",
  secondary = {
    label: "Explore Specialties",
    href: "/about#specialties",
    icon: Stethoscope,
  },
  assurances = DEFAULT_ASSURANCES,
  tone = "white",
}: CtaSectionProps) {
  const { openDemo } = useDemo();
  const handleOpenDemo = onOpenDemo ?? openDemo;
  const SecondaryIcon = secondary.icon ?? Stethoscope;

  return (
    <section 
      className={`py-24 sm:py-32 relative overflow-hidden border-t border-slate-200 ${
        tone === "grey" ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className="page-container">
        <div className="bg-white border border-slate-200 p-10 sm:p-16 lg:p-20 rounded-[40px] text-center relative z-10 shadow-xs overflow-hidden">
          {/* Brand reveal, looping behind the closing call to action.

              It goes inside this card rather than behind the section, because
              the card is opaque white and full-bleed within the container —
              a video on the section would only ever show in the margin around
              it, which reads as a framing accident rather than a background.

              The card's `overflow-hidden` and rounded-[40px] clip it, so the
              motion is contained by the CTA's own shape. */}
          <div className="absolute inset-0 pointer-events-none">
            <BackgroundVideo
              src="/video/logo-reveal.mp4"
              poster="/video/logo-reveal-poster.jpg"
              loop
            />
          </div>

          {/* Scrim — the single knob for how strongly the video reads. At /82
              the video contributes ~18%, which holds body copy at 4.70:1
              against the video's darkest frame (the navy wordmark), above the
              4.5:1 AA floor. The budget runs out at /80; do not go lower
              without re-checking the slate-600 subhead. White gives slightly
              more headroom here than slate-50 did elsewhere. */}
          <div className="absolute inset-0 pointer-events-none bg-white/82" />

          {/* Subtle inside gradient background */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(63,164,106,0.06),transparent_50%)]" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-20">
            {eyebrow && (
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-brand-teal mb-4">
                {eyebrow}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
              {headline}
              {headlineAccent && (
                <>
                  {" "}
                  <span className="text-brand-teal">{headlineAccent}</span>
                </>
              )}
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              {subhead}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={handleOpenDemo}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-teal text-white text-[15px] font-bold shadow-md hover:bg-brand-teal-deep hover:-translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
              >
                {primaryLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href={secondary.href}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-brand-ink text-[15px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
              >
                <SecondaryIcon className="w-4 h-4 text-brand-teal" />
                {secondary.label}
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-10 border-t border-slate-100">
              {assurances.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-500">
                  <a.icon className="w-4 h-4 text-brand-teal" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
