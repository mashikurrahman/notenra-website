"use client";

import { useState } from "react";
import { Search, Clipboard, Check, Sparkles, AlertCircle } from "lucide-react";

interface IcdEntry {
  diagnosis: string;
  code: string;
  category: string;
  hcc: string;
  notes: string;
}

const ICD_DATABASE: IcdEntry[] = [
  {
    diagnosis: "Type 2 diabetes mellitus without complications",
    code: "E11.9",
    category: "Endocrine/Metabolic",
    hcc: "HCC Category 19 (Low-Medium)",
    notes: "Default assignment for uncomplicated Type 2 Diabetes. Requires active treatment documentation.",
  },
  {
    diagnosis: "Essential (primary) hypertension",
    code: "I10",
    category: "Cardiovascular",
    hcc: "Non-HCC status",
    notes: "Assigned for primary arterial hypertension. Excludes secondary or renovascular hypertension.",
  },
  {
    diagnosis: "Angina pectoris, unspecified",
    code: "I20.9",
    category: "Cardiovascular",
    hcc: "HCC Category 88 (Medium)",
    notes: "Ischemic heart disease with exertional chest pain. Synchronizes with ECG documentation.",
  },
  {
    diagnosis: "Osteoarthritis of knee, unspecified",
    code: "M17.9",
    category: "Musculoskeletal",
    hcc: "Non-HCC status",
    notes: "Degenerative joint disease of the knee. Check for site detail (unilateral vs. bilateral).",
  },
  {
    diagnosis: "Major depressive disorder, single episode, mild",
    code: "F32.0",
    category: "Psychiatric",
    hcc: "Non-HCC status",
    notes: "Document clinical staging scale (e.g. PHQ-9 score) to support diagnosis levels.",
  },
  {
    diagnosis: "Asthma, unspecified, uncomplicated",
    code: "J45.909",
    category: "Respiratory",
    hcc: "Non-HCC status",
    notes: "Standard unspecified bronchial asthma. Add severity detailing (mild intermittent vs. persistent).",
  },
  {
    diagnosis: "Chronic obstructive pulmonary disease, unspecified",
    code: "J44.9",
    category: "Respiratory",
    hcc: "HCC Category 111 (Medium)",
    notes: "COPD with active bronchodilator or oxygen therapy documentation required.",
  },
  {
    diagnosis: "Atrial fibrillation, unspecified",
    code: "I48.91",
    category: "Cardiovascular",
    hcc: "HCC Category 96 (Medium-High)",
    notes: "Chronic or unspecified AFib. Requires active anticoagulation therapy review.",
  },
  {
    diagnosis: "Chronic kidney disease, stage 3 (moderate)",
    code: "N18.30",
    category: "Renal",
    hcc: "HCC Category 138 (Medium)",
    notes: "Moderate CKD based on eGFR rates between 30-59 mL/min. Monitor labs regularly.",
  },
];

export function IcdAutocomplete() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<IcdEntry>(ICD_DATABASE[0]);
  const [copied, setCopied] = useState(false);

  const filtered = ICD_DATABASE.filter((entry) =>
    entry.diagnosis.toLowerCase().includes(query.toLowerCase()) ||
    entry.code.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selected.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="page-container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            Clinical Search Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Live ICD-10 Coding Autocomplete
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Type any diagnosis or keyword below to experience how NOTENRA maps terminology into formal ICD-10 billing codes instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Search & Filter results */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search diagnosis (e.g. diabetes, hypertension, CKD)..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
              />
            </div>

            {/* Suggestions Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-xs max-h-[300px] overflow-y-auto space-y-1">
              {filtered.length > 0 ? (
                filtered.map((entry) => (
                  <button
                    key={entry.code}
                    onClick={() => {
                      setSelected(entry);
                      setCopied(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      selected.code === entry.code
                        ? "bg-slate-50 text-brand-teal"
                        : "hover:bg-slate-50/60 text-slate-600"
                    }`}
                  >
                    <span className="truncate max-w-[280px]">{entry.diagnosis}</span>
                    <span className="font-mono bg-brand-teal/5 px-2 py-0.5 rounded text-brand-teal border border-brand-teal-100/50">
                      {entry.code}
                    </span>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 italic flex flex-col items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5 text-slate-300" />
                  No direct matches found. Try typing &ldquo;diabetes&rdquo; or &ldquo;CKD&rdquo;.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Code profile panel */}
          <div className="md:col-span-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-3">
                  <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                  Code Mapping Profile
                </span>
                
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Clinical Diagnosis
                  </h3>
                  <p className="text-base font-extrabold text-brand-ink mt-0.5">
                    {selected.diagnosis}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      ICD-10 Billing Code
                    </h3>
                    <p className="text-2xl font-black text-brand-teal mt-0.5 font-mono">
                      {selected.code}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-slate-500 hover:text-brand-teal cursor-pointer"
                    title="Copy Code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      HCC Risk Adjustment
                    </h3>
                    <p className="text-xs font-semibold text-brand-ink mt-0.5">
                      {selected.hcc}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Specialty Category
                    </h3>
                    <p className="text-xs font-semibold text-brand-ink mt-0.5">
                      {selected.category}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-brand-teal/5 border border-brand-teal-100/50 rounded-2xl text-[11px] text-slate-600 leading-relaxed font-normal">
                  <span className="font-bold text-brand-teal block mb-1">Documentation Guidelines:</span>
                  {selected.notes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
