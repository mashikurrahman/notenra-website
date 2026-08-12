"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  FileText,
  BarChart3,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface BentoGridProps {
  /** Section ground. Each page sets its own white/grey rhythm; shared
      sections default to white so adding one never breaks a page. */
  tone?: "white" | "grey";
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}

function BentoCard({ children, className = "", isDark = false }: BentoCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-md cursor-default select-none ${className}`}
    >
      {/* Dynamic Radial Lighting Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          background: isDark
            ? `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`
            : `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(14, 124, 147, 0.08), transparent 80%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
}

export function BentoGrid({ tone = "white" }: BentoGridProps = {}) {
  return (
    <section
      className={`py-20 sm:py-24 relative overflow-hidden ${
        tone === "grey" ? "bg-slate-50 border-y border-slate-200" : "bg-white"
      }`}
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Built for enterprise-grade clinical operations.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            One platform connecting documentation, coding, billing, security, and practice intelligence.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Card 1: Large Feature - AI Clinical Documentation */}
          <BentoCard
            isDark
            className="md:col-span-2 lg:col-span-2 bg-[linear-gradient(135deg,#2563EB_0%,#1D4ED8_100%)] rounded-3xl p-7 text-white flex flex-col shadow-xs"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-6 border border-white/20 shadow-sm">
                <FileText className="w-3.5 h-3.5" />
                <span>Core Scribing Engine</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-3">
                Autonomous Clinical Documentation
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Continuous ambient listening transforms live patient encounters into fully formatted, EHR-ready SOAP notes with zero manual input required.
              </p>
            </div>

            <div className="mt-auto pt-8">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-white font-semibold">
                  <span>EHR Bi-directional Sync</span>
                  <span className="text-[10px] bg-white text-brand-teal px-2 py-0.5 rounded font-sans font-bold">
                    Active
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Encounter #98412 &bull; EPIC / Cerner / Athena Integration Validated
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Autonomous Coding Engine */}
          <BentoCard className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col hover:border-brand-teal/40 transition-colors shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-brand-ink mb-2">
                Medical Coding AI
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automates ICD-10, CPT, and HCC risk adjustments with built-in compliance logic.
              </p>
            </div>
            <div className="mt-auto pt-5 text-xs font-bold text-brand-teal flex items-center gap-1">
              <span>99.4% Clean Rate</span>
              <Zap className="w-3.5 h-3.5" />
            </div>
          </BentoCard>

          {/* Card 3: Pre-Claim Billing Validation */}
          <BentoCard className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col hover:border-brand-teal/40 transition-colors shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-ink/8 text-brand-ink flex items-center justify-center mb-4 border border-slate-200">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-brand-ink mb-2">
                Pre-Claim Billing
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Scrubs claims prior to submission to prevent denials and accelerate first-pass yield.
              </p>
            </div>
            <div className="mt-auto pt-5 text-xs font-bold text-brand-ink flex items-center gap-1">
              <span>+38% Revenue Velocity</span>
            </div>
          </BentoCard>

          {/* Card 4: Enterprise Compliance & HIPAA */}
          <BentoCard className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col hover:border-brand-teal/40 transition-colors shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-deep flex items-center justify-center mb-4 border border-brand-teal-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-brand-ink mb-2">
                HIPAA & SOC 2 Ready
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bank-grade AES-256 encryption with zero public model training on your patient data.
              </p>
            </div>
            <div className="mt-auto pt-5 text-xs font-bold text-brand-teal-deep flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>BAA Guaranteed</span>
            </div>
          </BentoCard>

          {/* Card 5: Large Feature - RCM Practice Intelligence */}
          <BentoCard className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-3xl p-7 flex flex-col shadow-xs hover:border-brand-teal/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-teal text-white flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-ink">
                    Practice Revenue Intelligence
                  </h4>
                  <p className="text-sm text-slate-500">
                    Real-time RVU tracking & denial analytics
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white border border-slate-200 text-xs font-bold text-brand-ink rounded-full">
                Multi-Location
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Gain complete visibility into physician coding accuracy, average Days in AR, and reimbursement velocity across all practice clinic locations.
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-base font-extrabold text-brand-ink">
                  12 Days
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">
                  Avg Days in AR
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-base font-extrabold text-brand-teal">
                  99.8%
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">
                  Clean Claim Rate
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-base font-extrabold text-brand-ink">
                  2.8 Hrs
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">
                  Daily Time Saved
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 6: Human Expert Audit Layer */}
          <BentoCard
            isDark
            className="surface-teal text-white rounded-3xl p-5 flex flex-col shadow-xs"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center mb-4 border border-white/25">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Human MD Review Layer
              </h4>
              <p className="text-sm text-white/85 leading-relaxed">
                Certified clinical reviewers verify notes for total accuracy, compliance, and peace of mind.
              </p>
            </div>
            <div className="mt-auto pt-5 text-xs font-bold text-white flex items-center gap-1.5">
              <span>100% Quality Guarantee</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
