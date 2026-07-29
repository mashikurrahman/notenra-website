"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Which code sets does NOTENRA support?", a: "NOTENRA supports ICD-10-CM, CPT, and HCPCS coding, along with modifier and documentation cross-checks needed for a clean claim." },
  { q: "Is every encounter reviewed by a person?", a: "Yes. NOTENRA uses automation to accelerate the work, then includes human review in the coding workflow to validate quality and coding rationale." },
  { q: "How does coding reduce claim denials?", a: "By checking documentation support, specificity, modifiers, and common conflicts before coding reaches billing, the workflow catches preventable issues earlier." },
  { q: "Can we use NOTENRA for audit preparation?", a: "Yes. Coding decisions retain supporting rationale and review history so your team can trace what was selected, why it was selected, and how it was validated." },
  { q: "Does NOTENRA replace our billing workflow?", a: "NOTENRA is designed to strengthen the coding handoff into your existing billing and revenue-cycle process, giving teams a more complete and reviewable code package." },
];

export function CodingFaq() {
  const [open, setOpen] = useState(0);
  return <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-2xl mx-auto mb-10"><h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">Coding questions, answered.</h2></div><div className="space-y-3">{faqs.map((faq, index) => { const isOpen = open === index; return <div key={faq.q} className="bg-white border border-slate-200 rounded-xl overflow-hidden"><button onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-4 p-5 text-left"><span className="text-base font-bold text-brand-ink">{faq.q}</span><span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? "surface-teal text-white rotate-180" : "bg-slate-100 text-slate-500"}`}><ChevronDown className="w-4 h-4" /></span></button><AnimatePresence>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}><p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p></motion.div>}</AnimatePresence></div>; })}</div></div></section>;
}
