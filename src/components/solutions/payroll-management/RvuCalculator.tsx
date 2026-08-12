"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export function RvuCalculator() {
  const [providers, setProviders] = useState(12);
  const [rvus, setRvus] = useState(600);

  // Estimates calculations
  const annualSavings = Math.round(providers * rvus * 1.95 * 12);
  const hoursReturned = Math.round(providers * (rvus / 22) * 1.5);
  const complianceScore = 99; // Target compliance closeout percentage

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="page-container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            Operations Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            RVU &amp; Compensation Simulator
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Select your clinical provider count and average monthly Relative Value Units (RVUs) to estimate documentation savings and operational returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto border border-slate-200 rounded-[32px] bg-slate-50/50 p-6 sm:p-8">
          
          {/* Left Side: Sliders */}
          <div className="md:col-span-7 space-y-6 flex flex-col justify-center">
            {/* Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-brand-ink uppercase tracking-wider">
                <span>Active Providers</span>
                <span className="text-brand-teal">{providers} Providers</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={providers}
                onChange={(e) => setProviders(parseInt(e.target.value))}
                className="w-full accent-brand-teal cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                <span>1</span>
                <span>25</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-brand-ink uppercase tracking-wider">
                <span>Avg. Monthly RVUs / Provider</span>
                <span className="text-brand-teal">{rvus} RVUs</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={rvus}
                onChange={(e) => setRvus(parseInt(e.target.value))}
                className="w-full accent-brand-teal cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                <span>100</span>
                <span>500</span>
                <span>1,000</span>
                <span>2,000</span>
              </div>
            </div>
          </div>

          {/* Right Side: Estimates */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                  Projected Annual Recovery
                </span>
                <span className="text-2xl font-black text-brand-teal">
                  ${annualSavings.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                      Hours Returned
                    </span>
                    <span className="text-xs font-bold text-brand-ink">
                      {hoursReturned} hrs/mo
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                      Chart Compliance
                    </span>
                    <span className="text-xs font-bold text-brand-ink">
                      {complianceScore}% in 24h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-slate-500 font-normal leading-relaxed">
                Calculations based on average documentation closeout speedups and HCC optimization categories.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
