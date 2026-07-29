"use client";

import Link from "next/link";
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
  onOpenDemo: () => void;
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
  const SecondaryIcon = secondary.icon ?? Stethoscope;

  return (
    <section
      className={`py-20 sm:py-24 relative overflow-hidden ${
        tone === "grey" ? "bg-slate-50 border-t border-slate-200" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="surface-navy rounded-[2.5rem] p-8 sm:p-14 lg:p-20 text-white text-center relative overflow-hidden shadow-xs">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            {eyebrow && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-aqua text-xs font-bold uppercase tracking-widest">
                {eyebrow}
              </span>
            )}

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {headline}
              {headlineAccent && (
                <>
                  {" "}
                  <span className="text-brand-aqua">{headlineAccent}</span>
                </>
              )}
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              {subhead}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-10 py-4 rounded-full surface-teal text-white text-base font-bold tracking-wide shadow-xs  hover:bg-brand-teal-deep hover:border-brand-teal-200 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>{primaryLabel}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href={secondary.href}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 text-base font-bold transition-all flex items-center justify-center gap-2"
              >
                <SecondaryIcon className="w-4 h-4 text-brand-aqua" />
                <span>{secondary.label}</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-300 pt-8 border-t border-white/10">
              {assurances.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-brand-aqua" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
