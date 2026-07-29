"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Activity, MessagesSquare, LogOut, Stethoscope, CheckCircle2 } from "lucide-react";

const docTypes = [
  {
    id: "soap",
    name: "SOAP Notes",
    icon: ClipboardList,
    tagline: "Day-to-day encounter documentation",
    description:
      "The default for most outpatient visits. Subjective, objective, assessment, and plan are separated cleanly and mapped to your practice's house style.",
    highlights: ["Practice-specific section order", "Vitals pulled into Objective", "Assessment linked to ICD-10"],
    sample: [
      { label: "S", text: "42yo F presents for annual exam and hypertension follow-up. Reports mild fatigue, otherwise well." },
      { label: "O", text: "BP 128/82, HR 74, BMI 26.1. Cardiopulmonary exam unremarkable." },
      { label: "A", text: "Essential hypertension, controlled. Routine preventive care." },
      { label: "P", text: "Continue Benicar 20mg daily. Lipid panel today. Return in 6 months." },
    ],
  },
  {
    id: "progress",
    name: "Progress Notes",
    icon: Activity,
    tagline: "Interval change over a course of care",
    description:
      "Built for follow-up and inpatient rounding, where what matters is the delta since the last encounter rather than a full re-statement.",
    highlights: ["Prior-visit context carried forward", "Interval change surfaced first", "Medication adjustments tracked"],
    sample: [
      { label: "Interval", text: "Day 3 post-admission. Dyspnea improved; ambulating in hallway without desaturation." },
      { label: "Exam", text: "Afebrile. Lungs with improved air entry bilaterally. No new edema." },
      { label: "Assessment", text: "CHF exacerbation responding to diuresis. Net negative 2.4L since admission." },
      { label: "Plan", text: "Transition IV to oral furosemide. Ambulate TID. Anticipate discharge in 24-48h." },
    ],
  },
  {
    id: "consult",
    name: "Consultation Notes",
    icon: MessagesSquare,
    tagline: "Specialist opinion, referrer-ready",
    description:
      "Structured for the referring clinician: the question asked, the findings, the impression, and clear recommendations they can act on.",
    highlights: ["Reason for referral stated up front", "Impression separated from plan", "Letter-ready formatting"],
    sample: [
      { label: "Referral", text: "Referred by Dr. Patel for evaluation of exertional chest tightness." },
      { label: "Findings", text: "ECG normal sinus rhythm. Stress echo negative for inducible ischemia." },
      { label: "Impression", text: "Non-cardiac chest pain. Likely musculoskeletal in origin." },
      { label: "Recommendation", text: "No further cardiac workup indicated. Trial of NSAIDs. Return if symptoms change." },
    ],
  },
  {
    id: "discharge",
    name: "Discharge Summaries",
    icon: LogOut,
    tagline: "The full stay, condensed accurately",
    description:
      "Synthesizes an entire admission into a handoff the next clinician can trust, with medication reconciliation and follow-up spelled out.",
    highlights: ["Hospital course summarized", "Medication reconciliation included", "Follow-up instructions explicit"],
    sample: [
      { label: "Admission", text: "Admitted 07/24 with acute decompensated heart failure." },
      { label: "Course", text: "Diuresed with IV furosemide. Symptoms resolved by day 4. No arrhythmia observed." },
      { label: "Discharge Meds", text: "Entresto 49/51mg BID, furosemide 40mg daily, metoprolol succinate 50mg daily." },
      { label: "Follow-up", text: "Cardiology in 7 days. Daily weights. Return for weight gain >3lb in 48h." },
    ],
  },
  {
    id: "specialty",
    name: "Specialty Documentation",
    icon: Stethoscope,
    tagline: "Tuned to your discipline",
    description:
      "Cardiology, orthopedics, dermatology, psychiatry, pediatrics and more — each with its own vocabulary, exam structure, and coding rules.",
    highlights: ["25+ specialty-tuned models", "Discipline-specific exam fields", "Specialty coding cross-checks"],
    sample: [
      { label: "Exam", text: "Right knee flexion 115 degrees, extension full. No effusion. Stable to varus/valgus stress." },
      { label: "Imaging", text: "Weight-bearing X-ray: Grade II osteoarthritis, medial compartment narrowing." },
      { label: "Assessment", text: "Primary osteoarthritis, right knee, medial compartment predominant." },
      { label: "Procedure", text: "Intra-articular corticosteroid injection performed under sterile technique." },
    ],
  },
];

export function DocTypes() {
  const [selected, setSelected] = useState(0);
  const active = docTypes[selected];

  return (
    <section id="types" className="py-24 sm:py-32 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            Every note your practice writes.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            One documentation engine across the full range of clinical note types.
          </p>
        </div>

        {/* Type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {docTypes.map((type, idx) => {
            const Icon = type.icon;
            const isSelected = selected === idx;
            return (
              <button
                key={type.id}
                onClick={() => setSelected(idx)}
                aria-current={isSelected}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border ${
                  isSelected
                    ? "bg-gradient-cyan text-white border-[#0E7C93] shadow-lg shadow-[#0E7C93]/25 scale-[1.03]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#0E7C93]/50 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-white" : "text-[#0E7C93]"}`} />
                <span className="text-xs font-bold leading-tight">{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E7C93]/10 text-[#0E7C93] text-xs font-extrabold">
                {active.tagline}
              </div>
              <h3 className="text-2xl font-bold text-[#1B3F60]">{active.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {active.description}
              </p>

              <div className="pt-2 space-y-2.5">
                {active.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-[#4ACCCE]/25 text-[#0E7C93] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample note */}
            <div className="lg:col-span-6 bg-gradient-navy text-white rounded-2xl p-6 border border-[#4ACCCE]/20 space-y-3 shadow-md shadow-[#1B3F60]/15">
              <div className="flex items-center gap-1.5 text-[#4ACCCE] font-bold text-[11px] border-b border-white/12 pb-2 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sample {active.name.replace(/s$/, "")}
              </div>
              <div className="space-y-2.5 pt-1">
                {active.sample.map((row) => (
                  <div key={row.label} className="flex gap-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4ACCCE] shrink-0 w-24 pt-0.5">
                      {row.label}
                    </span>
                    <p className="text-[11px] text-[#A5E9EA] leading-relaxed font-mono">
                      {row.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
