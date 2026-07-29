"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Who actually reviews the notes?",
    a: "Board-certified clinical reviewers employed and credentialed by NOTENRA. Every note is checked against the encounter before it reaches the physician's queue — not a sampled subset.",
  },
  {
    q: "How long does a note take end to end?",
    a: "The AI draft is typically ready in under 45 seconds after the encounter closes. Human review adds a short pass, so most notes are in the physician's queue within minutes of the visit ending.",
  },
  {
    q: "Will it match our practice's existing note format?",
    a: "Yes. During onboarding we learn your house style — section order, level of detail, phrasing conventions — and reproduce it. You are not adapting to a fixed template.",
  },
  {
    q: "Which note types are supported?",
    a: "SOAP notes, progress notes, consultation notes, discharge summaries, and specialty-specific documentation across 25+ disciplines, all from the same engine.",
  },
  {
    q: "How does the note get into our EHR?",
    a: "Through bi-directional FHIR/HL7 integration with Epic, Cerner, AthenaHealth, eClinicalWorks and 40+ other platforms. Structured content and suggested codes travel together into the chart.",
  },
  {
    q: "Is patient audio stored or used to train models?",
    a: "No. Audio is processed in real time and discarded after the note is synthesized. Patient data is never used to train third-party or shared foundation models, and a BAA is executed with every practice.",
  },
  {
    q: "What happens if a note needs correction?",
    a: "Physicians retain full editorial control and sign every note. Any edits made feed back into your practice's templates, so recurring preferences are learned rather than repeated.",
  },
];

export function DocFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
            Documentation questions.
          </h2>
        </div>

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
                  aria-expanded={isOpen}
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
