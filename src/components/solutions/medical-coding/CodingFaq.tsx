"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Which code sets does NOTENRA support?",
    a: "ICD-10-CM, CPT, and HCPCS, along with modifier assignment and E/M level selection. Documentation cross-checks run across all of them, so the codes on a claim are consistent with each other and with the note.",
  },
  {
    q: "Is every encounter reviewed by a person?",
    a: "Yes. Automation accelerates the mapping pass, then a credentialed coding professional validates the final selection and the evidence behind it. Every encounter is reviewed — not a sampled percentage.",
  },
  {
    q: "How does this reduce claim denials?",
    a: "Most preventable denials trace back to documentation support, specificity, modifiers, or bundling conflicts. Those are checked while the encounter is still being coded, so the issue is resolved before a claim exists rather than worked afterwards.",
  },
  {
    q: "Does it catch under-coding as well as over-coding?",
    a: "Both. Chronic under-coding quietly costs practices as much as over-coding risks them, so E/M levels and procedure codes are compared against documented medical decision-making in both directions and flagged when the record supports more than was billed.",
  },
  {
    q: "What happens when documentation is incomplete?",
    a: "The encounter is held and a query is routed back to the clinician with the specific gap identified. Codes are not guessed to keep a queue moving — an unsupported code is a denial or an audit finding later.",
  },
  {
    q: "Can we use NOTENRA for audit preparation?",
    a: "Yes. Each coding decision retains its supporting rationale and review history, so your team can trace what was selected, why it was selected, and who validated it — without reconstructing the reasoning months later.",
  },
  {
    q: "Does NOTENRA replace our billing workflow?",
    a: "No. It strengthens the handoff into your existing billing and revenue-cycle process. Your team receives a reviewed, claim-ready code package with rationale attached, and continues to submit and manage claims as they do today.",
  },
  {
    q: "How does coding connect to our documentation?",
    a: "If you also use NOTENRA for documentation, coding reads the same clinical record the note was built from, so specificity and codes are derived from one source of truth. If you document elsewhere, coding works from your existing charts through the same integrations.",
  },
];

export function CodingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-10 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Coding questions.
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
                      <div className="px-6 pb-6 pt-1 text-base text-slate-600 leading-relaxed font-normal border-t border-slate-100">
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
