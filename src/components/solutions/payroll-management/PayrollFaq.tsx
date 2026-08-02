"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Does NOTENRA actually run our payroll?",
    a: "No. NOTENRA calculates and documents what each clinician has earned, then exports approved figures to the payroll provider you already use. Disbursement, tax withholding, and year-end filings remain with that provider.",
  },
  {
    q: "Can it handle our specific compensation agreements?",
    a: "Yes. Terms are configured per clinician rather than as one shared formula — base guarantees, tiered conversion factors, production thresholds, quality components, and partner distributions can all coexist across the same group.",
  },
  {
    q: "Where do the wRVU figures come from?",
    a: "From the codes actually billed for each encounter, not from estimates or a separate productivity export. If you also use NOTENRA for coding, that means compensation and claims are calculated from one source of truth.",
  },
  {
    q: "How are shared visits and supervised mid-levels attributed?",
    a: "By configured attribution rules that reflect how your group has agreed to credit that work. Shared visits, supervision, and cross-site coverage are resolved against the encounter record rather than a spreadsheet convention that varies by who built it.",
  },
  {
    q: "What happens when a compensation term changes mid-year?",
    a: "New terms are effective-dated and apply from that date forward. Prior periods keep the terms they were calculated under, so history stays intact and a closed period never silently changes.",
  },
  {
    q: "Can clinicians see how their own number was reached?",
    a: "Yes, and this is the point. Each statement shows the arithmetic and drills into the encounters behind it. Most of the value here is that the monthly compensation conversation stops being a dispute about the figure.",
  },
  {
    q: "Who inside the practice can see compensation data?",
    a: "Access is role-based. Clinicians see their own statements, administrators see what their role permits, and every view and approval is logged — compensation data is treated with the same access discipline as clinical data.",
  },
  {
    q: "Do we need the rest of the platform to use this?",
    a: "No, but it works better with it. Payroll Management can read production from your existing systems. When documentation, coding, and billing sit on the same record, the production figures driving compensation are the same ones driving your claims.",
  },
];

export function PayrollFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-10 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Compensation questions.
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
