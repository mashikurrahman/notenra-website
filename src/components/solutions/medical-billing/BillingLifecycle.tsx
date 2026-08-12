"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Cpu,
  FileCheck2,
  Send,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

interface Milestone {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  leakage: string;
  safeguard: string;
  impact: string;
}

export function BillingLifecycle() {
  const [activeStep, setActiveStep] = useState(0);

  const milestones: Milestone[] = [
    {
      title: "Patient Encounter",
      subtitle: "Audio Capture",
      icon: User,
      leakage: "Clinicians lose up to 12% of billable codes due to details forgotten between the visit and manual code entry days later.",
      safeguard: "NOTENRA's ambient listening records the dialogue, capturing every clinically documented symptom and procedure immediately.",
      impact: "100% documentation capture rate from day one of deployment.",
    },
    {
      title: "AI Coding Crosscheck",
      subtitle: "Compliant Coding",
      icon: Cpu,
      leakage: "Coding backlogs delay claims by 5 to 14 days, creating cash flow lag.",
      safeguard: "AI crosschecks clinical notes with active ICD-10 and CPT code sets within seconds of encounter signoff.",
      impact: "Sub-24 hour turnaround for compliant claim package compilation.",
    },
    {
      title: "Pre-Claim Scrubber",
      subtitle: "Error Auditing",
      icon: FileCheck2,
      leakage: "Up to 18% of claims are denied due to simple omissions (missing modifiers, expired patient insurance, incorrect demographics).",
      safeguard: "Our automated scrubber audits the claim against active payer rules to check for validation errors before it leaves.",
      impact: "Achieve a 98% clean claim rate on initial submission.",
    },
    {
      title: "Clearinghouse",
      subtitle: "Secure Submission",
      icon: Send,
      leakage: "Manual submissions to clearinghouses risk formatting rejects that sit in workflow queues for days unresolved.",
      safeguard: "Direct API pipelines push structured HL7 and FHIR payloads securely to the clearinghouse instantly.",
      impact: "99% acceptance rate at the clearinghouse level.",
    },
    {
      title: "Paid",
      subtitle: "Revenue Recovery",
      icon: DollarSign,
      leakage: "Traditional billing cycles average 35-45 days to payout, with writeoffs for uncollected denials.",
      safeguard: "Clean claims bypass payer review gates, speeding up adjudication and recovering leaked revenue automatically.",
      impact: "Reduce average Days Sales Outstanding (DSO) to under 18 days.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="page-container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            Claim Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            The Billing Claim Pipeline
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Follow a claim's journey from patient encounter to payout, and see how NOTENRA shuts down billing leakage at every step.
          </p>
        </div>

        {/* Milestone Timeline Bar */}
        <div className="relative mb-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto select-none">
          {/* Horizontal connecting line (Desktop only) */}
          <div className="hidden md:block absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
          
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={item.title}
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-row md:flex-col items-center gap-3 bg-white p-4 md:p-3 rounded-2xl md:bg-transparent border md:border-transparent w-full md:w-auto cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "bg-brand-teal border-brand-teal text-white shadow-md shadow-brand-teal/20 scale-110"
                      : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left md:text-center space-y-0.5">
                  <p className={`text-xs font-bold transition-colors ${isActive ? "text-brand-teal" : "text-brand-ink"}`}>
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Details Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Milestone Details &bull; Step {activeStep + 1} of 5
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-teal uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  {milestones[activeStep].subtitle}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left side: Safeguard */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                    NOTENRA Safeguards
                  </h3>
                  <p className="text-xs text-brand-ink leading-relaxed font-semibold">
                    {milestones[activeStep].safeguard}
                  </p>
                </div>

                {/* Right side: Leakage */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider">
                    Common Payer Leakage
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {milestones[activeStep].leakage}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Expected Workflow Impact
                  </h4>
                  <p className="text-xs font-bold text-brand-ink mt-0.5">
                    {milestones[activeStep].impact}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
