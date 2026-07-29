"use client";

import { ShieldCheck, Sparkles, FileText, BarChart3, CheckCircle2, Zap } from "lucide-react";

export function BentoGrid() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            Built for enterprise-grade clinical operations.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            One platform connecting documentation, coding, billing, security, and practice intelligence.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Large Feature - AI Clinical Documentation (Span 2 Cols, Span 2 Rows) */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-navy rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden glass-panel-dark min-h-95">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#0E7C93]/18 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#4ACCCE] text-xs font-bold mb-6 border border-white/15">
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

            <div className="mt-8 p-4 bg-[#0A2B4B]/45 rounded-2xl border border-white/12 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-[#4ACCCE]">
                <span>EHR Bi-directional Sync</span>
                <span className="text-[10px] bg-[#0E7C93] text-white px-2 py-0.5 rounded font-sans">Active</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Encounter #98412 &bull; EPIC / Cerner / Athena Integration Validated
              </p>
            </div>
          </div>

          {/* Card 2: Autonomous Coding Engine */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between hover:border-[#0E7C93]/40 transition-colors shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0E7C93]/10 text-[#0E7C93] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#1B3F60] mb-2">Medical Coding AI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automates ICD-10, CPT, and HCC risk adjustments with built-in compliance logic.
              </p>
            </div>
            <div className="pt-4 text-xs font-bold text-[#0E7C93] flex items-center gap-1">
              <span>99.4% Clean Rate</span>
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Pre-Claim Billing Validation */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between hover:border-[#0E7C93]/40 transition-colors shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1B3F60]/8 text-[#1B3F60] flex items-center justify-center mb-4 border border-[#1B3F60]/12">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#1B3F60] mb-2">Pre-Claim Billing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scrubs claims prior to submission to prevent denials and accelerate first-pass yield.
              </p>
            </div>
            <div className="pt-4 text-xs font-bold text-[#1B3F60] flex items-center gap-1">
              <span>+38% Revenue Velocity</span>
            </div>
          </div>

          {/* Card 4: Enterprise Compliance & HIPAA */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between hover:border-[#0E7C93]/40 transition-colors shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#1B3F60] mb-2">HIPAA & SOC 2 Ready</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank-grade AES-256 encryption with zero public model training on your patient data.
              </p>
            </div>
            <div className="pt-4 text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>BAA Guaranteed</span>
            </div>
          </div>

          {/* Card 5: Large Feature - RCM Practice Intelligence (Span 2 Cols) */}
          <div className="md:col-span-2 bg-slate-50 border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C93] text-white flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1B3F60]">Practice Revenue Intelligence</h4>
                  <p className="text-xs text-slate-500">Real-time RVU tracking & denial analytics</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white border border-slate-200 text-xs font-bold text-[#1B3F60] rounded-full">
                Multi-Location
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Gain complete visibility into physician coding accuracy, average Days in AR, and reimbursement velocity across all practice clinic locations.
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-[#1B3F60]">12 Days</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Avg Days in AR</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-[#0E7C93]">99.8%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Clean Claim Rate</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-[#1B3F60]">2.8 Hrs</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Daily Time Saved</div>
              </div>
            </div>
          </div>

          {/* Card 6: Human Expert Audit Layer */}
          <div className="bg-linear-to-br from-[#1B3F60] to-[#0E7C93] text-white rounded-3xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center mb-4 border border-white/25">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Human MD Review Layer</h4>
              <p className="text-xs text-white/85 leading-relaxed">
                Certified clinical reviewers verify notes for total accuracy, compliance, and peace of mind.
              </p>
            </div>
            <div className="pt-4 text-xs font-bold text-white flex items-center gap-1">
              <span>100% Quality Guarantee</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
