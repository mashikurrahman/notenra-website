"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Activity,
  User,
} from "lucide-react";

/* Fixed per-bar timing so every bar breathes at a slightly different
   rate/phase - reads as organic audio, not a synchronized strobe.
   Computed once, deterministically, so server and client markup match. */
/* Sound wave bars shaped as a speech amplitude envelope:
   - Tall in the centre (loud vowel formants)
   - Shorter at the edges (consonant/silence)
   - Each bar has a unique phase/speed so they never sync into a strobe */
const RAW_HEIGHTS = [
  6, 10, 14, 18, 20, 22, 28, 32, 34, 36, 36, 34, 32, 28, 22, 20, 18, 14, 10, 6,
];

const WAVE_BARS = RAW_HEIGHTS.map((h, i) => {
  const duration = 0.7 + ((i * 41) % 70) / 100; // 0.70s - 1.40s
  const delay = -((i * 53) % 150) / 100; // stagger start phase
  // scaleY min = calm resting (30% of natural height)
  // scaleY max = 1 (full natural height)
  const min = 0.2 + ((i * 17) % 18) / 100; // 0.20 - 0.38
  return { h, duration, delay, min };
});

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState<"transcript" | "soap" | "codes">(
    "soap",
  );

  const conversationLines = [
    {
      speaker: "Dr. Jenkins",
      text: "Patient presents with 3-day history of sharp chest tightness during exertion.",
    },
    {
      speaker: "Patient",
      text: "It feels like pressure right in the middle, worse when I climb stairs.",
    },
    {
      speaker: "Dr. Jenkins",
      text: "BP is 138/86, HR 78 bpm. We will order a 12-lead ECG and basic metabolic panel.",
    },
  ];

  const icd10Codes = [
    { code: "R07.9", desc: "Chest pain, unspecified", confidence: "99.2%" },
    {
      code: "I10",
      desc: "Essential primary hypertension",
      confidence: "98.7%",
    },
    {
      code: "Z01.810",
      desc: "Encounter for preprocedural ECG",
      confidence: "99.8%",
    },
  ];

  const cptCodes = [
    {
      code: "99214",
      desc: "Office visit, established, moderate complexity",
      RVU: "1.92",
    },
    {
      code: "93000",
      desc: "Electrocardiogram, 12-lead, complete",
      RVU: "0.45",
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Abstract 3D Glassmorphism Container */}
      <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        {/* Floating Top Status Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl surface-teal text-white shadow-xs">
              <Mic className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-aqua rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-ink">
                  Ambient Clinical Scribe
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-teal-50 text-brand-teal-deep border border-brand-teal-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mr-1 animate-ping" />
                  Live Listening
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Patient Consultation &bull; Cardiology Workflow
              </p>
            </div>
          </div>

          {/* Expert Human Reviewer Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-ink/5 border border-slate-200 text-brand-ink text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-teal" />
            <span>Human MD Review: Active</span>
          </div>
        </div>

        {/* Sound wave - bars expand symmetrically up + down from a centre axis */}
        <div className="flex items-center justify-between gap-0.5 h-10 bg-white rounded-xl px-4 border border-slate-200 mb-6 overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-teal min-w-max">
            <Activity className="w-3.5 h-3.5 text-brand-aqua" />
            <span>Audio Input Stream</span>
          </div>
          {/* Waveform bars - heights are natural pixel values; scaleY from centre */}
          <div className="flex items-center justify-end gap-0.75 flex-1 h-full py-1">
            {WAVE_BARS.map((bar, i) => (
              <div
                key={i}
                className="w-0.75 rounded-full bg-linear-to-b from-brand-aqua via-brand-teal to-brand-aqua animate-audio-wave"
                style={{
                  height: `${bar.h}px`,
                  animationDuration: `${bar.duration}s`,
                  animationDelay: `${bar.delay}s`,
                  ["--wave-min" as string]: bar.min,
                  ["--wave-max" as string]: 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Interactive View Switcher Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab("soap")}
            className={`relative flex-1 py-2 px-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "soap"
                ? "text-brand-ink"
                : "text-slate-500 hover:text-brand-ink"
            }`}
          >
            {activeTab === "soap" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <FileCheck className="w-3.5 h-3.5 text-brand-teal relative z-10" />
            <span className="relative z-10">Structured SOAP Note</span>
          </button>
          <button
            onClick={() => setActiveTab("codes")}
            className={`relative flex-1 py-2 px-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "codes"
                ? "text-brand-ink"
                : "text-slate-500 hover:text-brand-ink"
            }`}
          >
            {activeTab === "codes" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <Sparkles className="w-3.5 h-3.5 text-brand-teal relative z-10" />
            <span className="relative z-10">ICD-10 & CPT Codes</span>
          </button>
          <button
            onClick={() => setActiveTab("transcript")}
            className={`relative flex-1 py-2 px-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "transcript"
                ? "text-brand-ink"
                : "text-slate-500 hover:text-brand-ink"
            }`}
          >
            {activeTab === "transcript" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <User className="w-3.5 h-3.5 text-brand-teal relative z-10" />
            <span className="relative z-10">Transcript</span>
          </button>
        </div>

        {/* Active Tab Panel Display */}
        <div className="min-h-55 bg-white rounded-2xl border border-slate-200 p-5 shadow-inner space-y-4">
          {activeTab === "soap" && (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="show"
              className="space-y-4 text-xs text-brand-ink"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                  Subjective
                </span>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium text-slate-700 text-xs leading-relaxed shadow-sm">
                  54yo male with exertional chest tightness x 3 days. Pain is
                  retrosternal, radiating to left shoulder, triggered by
                  climbing stairs. No diaphoresis or syncope.
                </p>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                  Objective
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-brand-ink/5 p-2.5 rounded-xl border border-slate-100 text-center font-bold">
                    <span className="block text-slate-500 text-[10px] font-semibold uppercase">BP</span>{" "}
                    138/86 mmHg
                  </div>
                  <div className="bg-brand-ink/5 p-2.5 rounded-xl border border-slate-100 text-center font-bold">
                    <span className="block text-slate-500 text-[10px] font-semibold uppercase">HR</span>{" "}
                    78 bpm
                  </div>
                  <div className="bg-brand-ink/5 p-2.5 rounded-xl border border-slate-100 text-center font-bold">
                    <span className="block text-slate-500 text-[10px] font-semibold uppercase">
                      SpO2
                    </span>{" "}
                    98%
                  </div>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <span className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                  Assessment & Plan
                </span>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium text-slate-700 text-xs leading-relaxed shadow-sm">
                  1. Chest Pain (R07.9) - Order 12-lead ECG immediately. 2.
                  Hypertension (I10) - Continue Lisinopril 10mg daily.
                </p>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "codes" && (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Automated ICD-10 Medical Diagnosis Codes
                </div>
                <div className="space-y-2">
                  {icd10Codes.map((item) => (
                    <div
                      key={item.code}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-brand-teal transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 surface-teal text-white border border-brand-teal-100 rounded-md font-mono font-bold text-xs shadow-xs">
                          {item.code}
                        </span>
                        <span className="text-xs font-bold text-brand-ink">
                          {item.desc}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-brand-teal/10 text-brand-teal-deep rounded-full">
                        Confidence {item.confidence}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 pt-2">
                  Suggested CPT Billing Procedure Codes
                </div>
                <div className="space-y-2">
                  {cptCodes.map((item) => (
                    <div
                      key={item.code}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-brand-teal transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 surface-blue text-white rounded-md font-mono font-bold text-xs shadow-xs">
                          CPT {item.code}
                        </span>
                        <span className="text-xs font-bold text-brand-ink">
                          {item.desc}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        RVU {item.RVU}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "transcript" && (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {conversationLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 shadow-sm"
                >
                  <span className="font-extrabold text-brand-teal block text-[10px] uppercase tracking-wider">
                    {line.speaker}
                  </span>
                  <p className="text-slate-700 font-medium text-xs leading-relaxed">{line.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Bottom Floating Pill: Verified Human Quality Layer */}
        <div className="mt-5 flex items-center justify-between p-3 rounded-2xl bg-white border border-brand-teal-200 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full surface-teal flex items-center justify-center text-white shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-brand-ink text-xs">
                EHR Direct Sync Ready
              </span>
              <span className="text-[10px] text-slate-500">
                Reviewed & signed in under 45 seconds
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              setActiveTab(activeTab === "soap" ? "codes" : "soap")
            }
            className="px-3 py-1.5 rounded-lg surface-teal hover:brightness-110 text-white text-[11px] font-bold transition-all shadow-xs"
          >
            Toggle View
          </button>
        </div>
      </div>
    </div>
  );
}
