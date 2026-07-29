"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Code2, Layers3, Stethoscope } from "lucide-react";

const sets = [
  { id: "icd", name: "ICD-10-CM", icon: Stethoscope, caption: "Diagnoses with the right specificity", code: "M17.11", title: "Unilateral primary osteoarthritis, right knee", tags: ["Laterality confirmed", "Specificity supported", "Assessment matched"], detail: "Clinical context is used to distinguish the diagnosis that is documented from the diagnosis that is merely possible, with specificity that the record supports." },
  { id: "cpt", name: "CPT", icon: Code2, caption: "Procedures and services, accurately represented", code: "20610", title: "Arthrocentesis, aspiration and/or injection; major joint", tags: ["Procedure note linked", "Global rules checked", "Modifier reviewed"], detail: "Procedures are mapped to the service actually performed, with documentation and modifier logic reviewed before codes move to billing." },
  { id: "hcpcs", name: "HCPCS", icon: Layers3, caption: "Supplies and drug administration covered", code: "J3301", title: "Triamcinolone acetonide, per 10 mg", tags: ["Unit logic checked", "Supply captured", "NDC available"], detail: "HCPCS details are reconciled with the encounter so administered medications and supplies are captured cleanly alongside the procedure." },
];

export function CodeSets() {
  const [selected, setSelected] = useState(0);
  const current = sets[selected];
  const Icon = current.icon;
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10"><h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">Coverage across the code sets that matter.</h2><p className="text-lg text-slate-600 mt-4 leading-relaxed">A single workflow for the diagnoses, procedures, drugs, and supplies that make up a complete claim.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {sets.map((item, index) => { const SetIcon = item.icon; const active = index === selected; return <button key={item.id} onClick={() => setSelected(index)} className={`text-left rounded-xl p-4 border transition-all ${active ? "bg-white border-brand-teal shadow-xs" : "border-slate-200 hover:bg-white"}`}><div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? "surface-teal text-white" : "bg-white text-slate-500 border border-slate-200"}`}><SetIcon className="w-4 h-4" /></div><div><div className="text-sm font-bold text-brand-ink">{item.name}</div><div className="text-[11px] text-slate-500 mt-0.5">{item.caption}</div></div></div></button>; })}
        </div>
        <AnimatePresence mode="wait"><motion.div key={current.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5"><div className="w-11 h-11 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></div><div className="font-mono text-3xl font-extrabold text-brand-teal mb-2">{current.code}</div><h3 className="text-xl font-bold text-brand-ink mb-3">{current.title}</h3><p className="text-sm text-slate-600 leading-relaxed">{current.detail}</p></div>
          <div className="lg:col-span-7 surface-navy rounded-2xl p-5 sm:p-6 text-white"><div className="text-[10px] uppercase tracking-widest font-extrabold text-brand-aqua mb-4">Coding support check</div><div className="space-y-3">{current.tags.map((tag, index) => <motion.div key={tag} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} className="flex items-center gap-3 text-sm text-slate-200"><CheckCircle2 className="w-4 h-4 text-brand-aqua shrink-0" />{tag}</motion.div>)}</div></div>
        </motion.div></AnimatePresence>
      </div>
    </section>
  );
}
