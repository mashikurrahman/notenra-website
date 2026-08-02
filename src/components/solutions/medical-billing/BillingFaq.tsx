"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do we have to switch our practice management system?",
    a: "No. Billing works alongside your existing PM and EHR through the same integrations used elsewhere on the platform. Claims are built from the data already in your system rather than requiring a migration.",
  },
  {
    q: "What exactly does the pre-submission scrub check?",
    a: "Eligibility and demographic consistency, coding specificity, modifier necessity and conflicts, unit and NDC detail, NCCI bundling pairs, LCD requirements, and payer-specific edits. Anything that fails is corrected before the claim is transmitted.",
  },
  {
    q: "Who works our denials — your team or ours?",
    a: "Ours, by default. Denials are triaged by root cause, corrected or appealed with supporting documentation, and tracked until they are paid or formally closed. Your team keeps full visibility and can step in on any claim.",
  },
  {
    q: "How do you handle underpayments?",
    a: "Remittances are posted line by line and compared against your contracted rates. Where a payer pays less than the contract allows, the variance is flagged and appealed rather than accepted as final.",
  },
  {
    q: "Can we use billing without NOTENRA documentation and coding?",
    a: "Yes. Billing runs on its own and works from your existing charts and codes. It does get stronger alongside the other layers, because a claim whose codes were already verified against the clinical record arrives with its supporting evidence attached.",
  },
  {
    q: "What visibility do we get into our own revenue cycle?",
    a: "Per-claim status, denial reasons by root cause, A/R by age and payer, and first-pass acceptance over time — available continuously, not delivered as a monthly summary after the point where you could have acted on it.",
  },
  {
    q: "How are patient balances handled?",
    a: "Statements are issued in plain language showing what insurance covered and what remains, with online, phone, and payment-plan options. Routine balance questions are handled before they reach your front desk.",
  },
  {
    q: "Is patient financial data handled to the same standard as clinical data?",
    a: "Yes. The same controls apply across the platform: HIPAA compliance with a BAA executed for every practice, SOC 2 Type II audited controls, AES-256 encryption at rest, TLS 1.3 in transit, and a full audit log of every action taken on a claim.",
  },
];

export function BillingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-10 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Billing questions.
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
