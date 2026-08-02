"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  /** Section background tone to fit the site alternate colors. */
  tone?: "white" | "grey";
}

export function SpecialtiesSection({
  tone = "white",
}: SpecialtiesSectionProps = {}) {
  // Default to Family Medicine (index 0) so the preview card is visible immediately
  const [selectedSpecialty, setSelectedSpecialty] = useState<number>(0);

  const specialties = [
    {
      name: "Family Medicine",
      icon: Stethoscope,
      description:
        "Pre-loaded templates for annual wellness visits, chronic disease management, and preventive care documentation — aligned with family medicine coding patterns.",
      sampleNote:
        "HPI: 42yo F for annual exam & HTN check. ROS: Neg except mild fatigue. Plan: Lipid panel, continue Benicar 20mg.",
      codes: ["99214", "Z00.00", "I10"],
    },
    {
      name: "Internal Medicine",
      icon: Shield,
      description:
        "Complex multi-system encounter documentation, medication reconciliation, and high-complexity E/M coding support built into every note.",
      sampleNote:
        "Assessment: Type 2 Diabetes with neuropathy (E11.40). HbA1c 7.4%. Plan: Add Jardiance 10mg daily, podiatry referral.",
      codes: ["E11.40", "99215", "Z79.4"],
    },
    {
      name: "Cardiology",
      icon: Heart,
      description:
        "Structured cardiac encounter notes with integrated ECG interpretation fields, procedure documentation, and cardiology-specific ICD-10 mapping.",
      sampleNote:
        "ECG: Normal sinus rhythm, rate 72. Echo: LVEF 55%, mild MR. Plan: Titrate Metoprolol succinate to 50mg daily.",
      codes: ["93000", "I50.22", "I25.10"],
    },
    {
      name: "Dermatology",
      icon: Sparkles,
      description:
        "Lesion-specific documentation templates, dermatology procedure notes, and visual descriptor fields for accurate coding of skin conditions.",
      sampleNote:
        "Exam: 4mm asymmetrical pigmented macule right upper back. Action: Shave biopsy performed with local 1% Lidocaine.",
      codes: ["11102", "D22.5", "99213"],
    },
    {
      name: "Psychiatry",
      icon: Brain,
      description:
        "Mental status examination templates, medication management notes, and psychotherapy documentation aligned with psychiatric coding requirements.",
      sampleNote:
        "MSE: Mood euthymic, affect congruent, thought process linear. PHQ-9 score 6 (mild). Plan: Maintain Lexapro 10mg daily.",
      codes: ["90834", "F33.1", "99214"],
    },
    {
      name: "Orthopedics",
      icon: Activity,
      description:
        "Musculoskeletal encounter documentation with anatomy-specific terminology, surgical note templates, and orthopedic procedure coding.",
      sampleNote:
        "Physical Exam: Right knee flexion 115 degrees, stability intact. X-ray: Grade II OA medial compartment. Plan: Cortisone injection.",
      codes: ["20610", "M17.11", "99204"],
    },
    {
      name: "Pediatrics",
      icon: Baby,
      description:
        "Age-appropriate developmental assessment templates, well-child visit documentation, and pediatric-specific growth metric capture.",
      sampleNote:
        "Well-child exam: 18-month-old meeting motor/speech milestones. Weight 50th percentile. Vaccines administered: DTaP, MMR.",
      codes: ["Z00.121", "90707", "99392"],
    },
    {
      name: "Oncology",
      icon: Shield,
      description:
        "Treatment response documentation, chemotherapy administration records, and oncology staging support for high-complexity encounter coding.",
      sampleNote:
        "Assessment: Stage IIA Invasive Ductal Carcinoma ER+/PR+/HER2-. Cycle 3 TCH completed with Grade 1 neuropathy.",
      codes: ["C50.911", "96413", "99215"],
    },
    {
      name: "OB/GYN",
      icon: Stethoscope,
      description:
        "Comprehensive obstetrical care tracking, prenatal visit templates, and gynecological procedure documentation aligned with coding standards.",
      sampleNote:
        "HPI: 28yo G1P0 at 24 weeks gestation for routine prenatal check. BP 118/76. FHR 145 bpm, reactive. Plan: Glucose loading test.",
      codes: ["99214", "Z34.90", "59400"],
    },
    {
      name: "Ophthalmology",
      icon: Sparkles,
      description:
        "Automated slit-lamp exam formatting, visual acuity scoring, intraocular pressure metrics, and refractive error documentation.",
      sampleNote:
        "Visual Acuity: OD 20/40, OS 20/30. Slit Lamp: Cornea clear, lenses trace nuclear sclerosis. IOP: OD 14, OS 15. Plan: Update refraction.",
      codes: ["92014", "H40.9", "92015"],
    },
    {
      name: "Gastroenterology",
      icon: Activity,
      description:
        "Structured endoscopy and colonoscopy report summaries, chronic GI condition tracking, and specialty coding guidelines.",
      sampleNote:
        "Assessment: Crohn's disease of ileum without complications (K50.90), stable. Plan: Continue Humira 40mg sub-Q every other week.",
      codes: ["45378", "K50.90", "99214"],
    },
    {
      name: "Neurology",
      icon: Brain,
      description:
        "Detailed cranial nerve exam formatting, stroke risk evaluations, headache diaries, and electroencephalogram (EEG) clinical records.",
      sampleNote:
        "Exam: Cranial nerves II-XII intact. DTRs 2+ symmetric. Assessment: Migraine without aura, intractable (G43.909). Plan: Start Nurtec.",
      codes: ["99214", "G43.909", "95819"],
    },
  ];

  const currentSpecialty = specialties[selectedSpecialty];

  return (
    <section
      id="specialties"
      className={`py-20 sm:py-28 border-b border-slate-200 relative overflow-hidden ${
        tone === "grey" ? "bg-slate-50" : "bg-white"
      }`}
    >
      {/* Dynamic inline styles for orbit and pulse ring keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        .orbit-item-custom {
          position: absolute;
          top: 50%;
          left: 50%;
          animation: orbit 24s linear infinite;
          transform-origin: 0 0;
        }
        .orbit-item-custom:nth-child(1) { animation-delay: 0s; }
        .orbit-item-custom:nth-child(2) { animation-delay: -2s; }
        .orbit-item-custom:nth-child(3) { animation-delay: -4s; }
        .orbit-item-custom:nth-child(4) { animation-delay: -6s; }
        .orbit-item-custom:nth-child(5) { animation-delay: -8s; }
        .orbit-item-custom:nth-child(6) { animation-delay: -10s; }
        .orbit-item-custom:nth-child(7) { animation-delay: -12s; }
        .orbit-item-custom:nth-child(8) { animation-delay: -14s; }
        .orbit-item-custom:nth-child(9) { animation-delay: -16s; }
        .orbit-item-custom:nth-child(10) { animation-delay: -18s; }
        .orbit-item-custom:nth-child(11) { animation-delay: -20s; }
        .orbit-item-custom:nth-child(12) { animation-delay: -22s; }

        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.08); opacity: 0.15; }
        }
        .pulse-ring-custom {
          animation: ring-pulse 3s ease-in-out infinite;
        }
        .pulse-ring-custom-2 {
          animation: ring-pulse 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `,
        }}
      />

      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left Column: Orbital visualization */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none">
            <div className="relative w-[380px] h-[380px] flex items-center justify-center">
              {/* Pulse rings */}
              <div className="absolute w-44 h-44 rounded-full border border-brand-teal/10 pulse-ring-custom pointer-events-none" />
              <div className="absolute w-64 h-64 rounded-full border border-brand-teal/5 pulse-ring-custom-2 pointer-events-none" />
              <div className="absolute w-80 h-80 rounded-full border border-brand-teal/[0.04] border-dashed pulse-ring-custom pointer-events-none" style={{ animationDelay: '0.75s' }} />
              
              {/* Central Badge */}
              <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center z-10 text-center bg-gradient-to-br from-brand-teal to-brand-teal-deep shadow-lg text-white p-3">
                <Stethoscope className="w-5 h-5 mb-1.5" />
                <p className="text-[10px] font-bold tracking-wider uppercase leading-tight">
                  {currentSpecialty.name}
                </p>
              </div>

              {/* Orbiting Pills Container - Isolated so :relative index works accurately on pills */}
              <div className="absolute inset-0 z-20">
                {specialties.map((item, idx) => {
                  const isSelected = selectedSpecialty === idx;
                  return (
                    <div
                      key={item.name}
                      className="orbit-item-custom"
                      style={{
                        marginLeft: "-40px",
                        marginTop: "-16px",
                      }}
                    >
                      <button
                        onClick={() => setSelectedSpecialty(idx)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 shadow-sm cursor-pointer border ${
                          isSelected
                            ? "bg-brand-teal text-white border-brand-teal scale-110 ring-4 ring-brand-teal/15"
                            : "bg-white text-slate-700 border-slate-200 hover:border-brand-teal-200"
                        }`}
                      >
                        {item.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
                Specialties
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
                Designed for how medicine is actually practiced.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                NOTENRA adapts to specialty-specific documentation requirements, terminology, and coding conventions — not the other way around. Click any specialty to inspect its clinical profile.
              </p>
            </div>

            {/* Specialty Preview Display */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSpecialty}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-brand-ink">
                      {currentSpecialty.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {currentSpecialty.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-slate-100">
                    {/* Codes */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                        Top Suggested Codes:
                      </span>
                      {currentSpecialty.codes.map((code) => (
                        <span
                          key={code}
                          className="px-2 py-0.5 rounded-md bg-brand-teal/5 text-brand-teal border border-brand-teal-100/50 text-[10px] font-mono font-bold"
                        >
                          {code}
                        </span>
                      ))}
                    </div>

                    {/* Sample Note */}
                    <div className="bg-slate-50 text-slate-700 rounded-xl p-4 border border-slate-200 space-y-2 font-mono text-[10.5px] shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 text-[10px]">
                        <span className="flex items-center gap-1.5 text-brand-teal font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Sample {currentSpecialty.name} Note Snippet
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed pt-1 whitespace-pre-line">
                        {currentSpecialty.sampleNote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
