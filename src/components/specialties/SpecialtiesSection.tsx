"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Heart,
  Activity,
  Sparkles,
  Brain,
  Baby,
  Shield,
  CheckCircle2,
} from "lucide-react";

interface SpecialtiesSectionProps {
  /** Section ground. Each page sets its own white/grey rhythm. */
  tone?: "white" | "grey";
}

export function SpecialtiesSection({
  tone = "white",
}: SpecialtiesSectionProps = {}) {
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);

  const specialties = [
    {
      name: "Family Medicine",
      icon: Stethoscope,
      description:
        "Handles complex multi-system chronic care, preventative wellness visits, and acute illness encounters with ease.",
      sampleNote:
        "HPI: 42yo F for annual exam & HTN check. ROS: Neg except mild fatigue. Plan: Lipid panel, continue Benicar 20mg.",
      codes: ["99214", "Z00.00", "I10"],
    },
    {
      name: "Cardiology",
      icon: Heart,
      description:
        "Structured templates for echo interpretations, 12-lead ECG analysis, heart failure management, and lipidology.",
      sampleNote:
        "ECG: Normal sinus rhythm, rate 72. Echo: LVEF 55%, mild MR. Plan: Titrate Metoprolol succinate to 50mg daily.",
      codes: ["93000", "I50.22", "I25.10"],
    },
    {
      name: "Orthopedics",
      icon: Activity,
      description:
        "Automated joint range-of-motion capture, surgical consult note templates, and post-op rehabilitation tracking.",
      sampleNote:
        "Physical Exam: Right knee flexion 115 degrees, stability intact. X-ray: Grade II OA medial compartment. Plan: Cortisone injection.",
      codes: ["20610", "M17.11", "99204"],
    },
    {
      name: "Dermatology",
      icon: Sparkles,
      description:
        "Rapid lesion location mapping, dermoscopy descriptions, biopsy documentation, and cosmetic procedure tracking.",
      sampleNote:
        "Exam: 4mm asymmetrical pigmented macule right upper back. Action: Shave biopsy performed with local 1% Lidocaine.",
      codes: ["11102", "D22.5", "99213"],
    },
    {
      name: "Psychiatry",
      icon: Brain,
      description:
        "Comprehensive Mental Status Exam (MSE) formatting, PHQ-9 tracking, medication management, and therapy session notes.",
      sampleNote:
        "MSE: Mood euthymic, affect congruent, thought process linear. PHQ-9 score 6 (mild). Plan: Maintain Lexapro 10mg daily.",
      codes: ["90834", "F33.1", "99214"],
    },
    {
      name: "Internal Medicine",
      icon: Shield,
      description:
        "High-complexity inpatient & outpatient management notes, polypharmacy reconciliations, and lab trend tracking.",
      sampleNote:
        "Assessment: Type 2 Diabetes with neuropathy (E11.40). HbA1c 7.4%. Plan: Add Jardiance 10mg daily, podiatry referral.",
      codes: ["E11.40", "99215", "Z79.4"],
    },
    {
      name: "Pediatrics",
      icon: Baby,
      description:
        "Growth percentile curves, developmental milestones, vaccination schedules, and pediatric acute care encounters.",
      sampleNote:
        "Well-child exam: 18-month-old meeting motor/speech milestones. Weight 50th percentile. Vaccines administered: DTaP, MMR.",
      codes: ["Z00.121", "90707", "99392"],
    },
    {
      name: "Oncology",
      icon: Shield,
      description:
        "Staging documentation, chemotherapy regimen tracking, toxicities scoring, and multi-disciplinary tumor board notes.",
      sampleNote:
        "Assessment: Stage IIA Invasive Ductal Carcinoma ER+/PR+/HER2-. Cycle 3 TCH completed with Grade 1 neuropathy.",
      codes: ["C50.911", "96413", "99215"],
    },
  ];

  return (
    // Warm band: one deliberate break in an otherwise all-cool page. Without
    // it the white/cool-grey alternation reads as clinical-flat.
    <section
      id="specialties"
      className={`py-16 sm:py-24 border-b border-slate-200 relative overflow-hidden ${
        tone === "grey" ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
            Specialty-tuned clinical intelligence.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Pre-configured note templates and coding cross-checks for every
            major specialty.
          </p>
        </div>

        {/* Interactive Specialty Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {specialties.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedSpecialty === idx;
            return (
              <button
                key={item.name}
                onClick={() => setSelectedSpecialty(idx)}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border ${
                  isSelected
                    ? "surface-teal text-white border-brand-teal shadow-xs  scale-[1.03]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-brand-teal-200 hover:bg-white"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-2 ${isSelected ? "text-white" : "text-brand-teal"}`}
                />
                <span className="text-xs font-bold leading-tight">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Specialty Preview Display */}
        <motion.div
          key={selectedSpecialty}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-extrabold">
              {specialties[selectedSpecialty].name} Workflow Active
            </div>
            <h3 className="text-2xl font-bold text-brand-ink">
              Specialized for {specialties[selectedSpecialty].name} Practices
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {specialties[selectedSpecialty].description}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">
                Top Suggested Codes:
              </span>
              {specialties[selectedSpecialty].codes.map((code) => (
                <span
                  key={code}
                  className="px-2.5 py-1 rounded-md bg-brand-teal/10 text-brand-teal border border-brand-teal-100 text-xs font-mono font-bold"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 surface-navy text-white rounded-2xl p-5 border border-brand-aqua/20 space-y-3 font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between text-[#9FC4D6] border-b border-white/12 pb-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-brand-aqua font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sample {specialties[selectedSpecialty].name} Note
              </span>
            </div>
            <p className="text-[#A5E9EA] leading-relaxed pt-1">
              {specialties[selectedSpecialty].sampleNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
