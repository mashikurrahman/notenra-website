"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Which EHR systems does NOTENRA integrate with?",
      a: "Epic, Cerner, AthenaHealth, eClinicalWorks, and over 40 leading EHR platforms via bi-directional HL7/FHIR APIs.",
    },
    {
      q: "How does the Expert Human Reviewer layer work?",
      a: "For practices on our Hybrid plan, generated notes and codes pass through certified clinical reviewers before EHR sign-off - typically under 45 seconds.",
    },
    {
      q: "Is NOTENRA HIPAA compliant?",
      a: "Yes. NOTENRA is HIPAA compliant and SOC 2 Type II certified, with TLS 1.3 in transit and AES-256 at rest. A BAA is executed with every practice.",
    },
    {
      q: "Is patient consultation audio stored or used to train AI models?",
      a: "No. Audio is processed in real time and discarded after note synthesis. Patient data is never used to train third-party models.",
    },
    {
      q: "Can NOTENRA handle specialty-specific documentation and coding?",
      a: "Yes - pre-tuned models for 25+ specialties, each with specialty-specific ICD-10 and CPT coding rules.",
    },
    {
      q: "How long does practice onboarding take?",
      a: "Under 15 minutes per physician. No software installation required - works on desktop, tablet, or mobile.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-10 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Frequently asked questions.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-brand-teal-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-brand-ink">
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all duration-200 shrink-0 ${
                      isOpen
                        ? "bg-brand-teal text-white rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
