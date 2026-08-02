"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Capture Conversation",
      subtitle: "Ambient Listening",
      description:
        "Tap 'Start Consultation' - ambient AI listens to the natural dialogue with noise filtering.",
      details: ["Zero manual typing or templates", "Multi-speaker detection"],
      icon: Mic,
      preview: {
        title: "Ambient Voice Capture",
        status: "Active Recording - 48kHz",
        snippet:
          '"Doctor: Let\'s review your echo results from Tuesday. Patient: I felt much less short of breath on the treadmill..."',
      },
    },
    {
      number: "02",
      title: "AI Creates Documentation",
      subtitle: "Instant Synthesis",
      description:
        "Within seconds, NOTENRA structures the visit into a complete SOAP note with suggested codes.",
      details: [
        "Practice-specific SOAP structure",
        "Automated ICD-10 & CPT suggestions",
      ],
      icon: Cpu,
      preview: {
        title: "Clinical Synthesis Engine",
        status: "Note Generated in 38s",
        snippet:
          "Subjective: 58yo F with exertional dyspnea. Assessment: Non-ischemic cardiomyopathy (I50.22). Plan: Increase Entresto 49/51mg.",
      },
    },
    {
      number: "03",
      title: "Clinical Experts Review",
      subtitle: "Human-in-the-Loop Quality",
      description:
        "Certified clinical reviewers perform a fast quality check to guarantee accuracy and compliance.",
      details: [
        "Zero hallucination risk guarantee",
        "Audit trail & HIPAA verification",
      ],
      icon: ShieldCheck,
      preview: {
        title: "Clinical Quality Verification",
        status: "Verified by Board-Certified MD",
        snippet:
          "Audit status: Approved (100% Match). Verification timestamp: 2026-07-29 09:30:14 UTC.",
      },
    },
    {
      number: "04",
      title: "Ready for EHR & Billing",
      subtitle: "1-Click Direct Sync",
      description:
        "Review and sign off - structured notes and codes flow directly into your EHR.",
      details: [
        "Bi-directional FHIR / HL7 sync",
        "Direct export to pre-claim scrubber",
      ],
      icon: CheckCircle2,
      preview: {
        title: "EHR & Billing Pipeline",
        status: "Sync Successful - Claim Scrubbed",
        snippet:
          "Pushed to Epic EHR encounter #90214 - CPT 99214 + ICD-10 I50.22 verified for claim generation.",
      },
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-10 sm:py-16 bg-slate-50 relative overflow-hidden border-b border-slate-200"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            How it works.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Four steps from conversation to a signed, coded note.
          </p>
        </div>

        {/* Step Cards Grid & Interactive Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Side: Step List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-white border-brand-teal shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                          isActive
                            ? "bg-brand-teal text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        Step {step.number}
                      </span>
                      <h3 className="text-lg font-bold text-brand-ink">
                        {step.title}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-brand-teal text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Side: Dynamic Visual Stepper Preview */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-xs border border-brand-teal-200">
              <div className="absolute inset-x-0 top-0 h-1 surface-teal" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 relative z-10"
                >
                  {/* Step Header inside Box */}
                  <div className="flex items-center justify-between border-b border-brand-teal-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl surface-teal flex items-center justify-center text-white shadow-xs">
                        {React.createElement(steps[activeStep].icon, {
                          className: "w-5 h-5",
                        })}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                          Stage {steps[activeStep].number} &bull;{" "}
                          {steps[activeStep].subtitle}
                        </div>
                        <h4 className="text-xl font-bold text-brand-ink">
                          {steps[activeStep].preview.title}
                        </h4>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-brand-teal border border-brand-teal-200 shadow-2xs">
                      {steps[activeStep].preview.status}
                    </span>
                  </div>

                  {/* Code / Content Snippet Box */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-slate-600 leading-relaxed shadow-sm">
                    {steps[activeStep].preview.snippet}
                  </div>

                  {/* Bullet Checklist */}
                  <div className="space-y-2.5 pt-2">
                    {steps[activeStep].details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-3 text-xs text-slate-600"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-aqua/25 text-brand-teal flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stepper Progress Indicators */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-teal-100 text-xs">
                    <span className="text-slate-500">
                      Step {activeStep + 1} of 4
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2, 3].map((dot) => (
                        <button
                          key={dot}
                          onClick={() => setActiveStep(dot)}
                          aria-label={`Go to step ${dot + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            dot === activeStep
                              ? "w-8 surface-teal"
                              : "w-2 bg-brand-ink/15 hover:bg-brand-teal/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
