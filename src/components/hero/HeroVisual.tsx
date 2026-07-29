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
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "soap"
                ? "bg-white text-brand-ink shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-brand-ink"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-brand-teal" />
            <span>Structured SOAP Note</span>
          </button>
          <button
            onClick={() => setActiveTab("codes")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "codes"
                ? "bg-white text-brand-ink shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-brand-ink"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            <span>ICD-10 & CPT Codes</span>
          </button>
          <button
            onClick={() => setActiveTab("transcript")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "transcript"
                ? "bg-white text-brand-ink shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-brand-ink"
            }`}
          >
            <User className="w-3.5 h-3.5 text-brand-teal" />
            <span>Transcript</span>
          </button>
        </div>

        {/* Active Tab Panel Display */}
        <div className="min-h-55 bg-white rounded-2xl border border-slate-200 p-5 shadow-inner space-y-4">
          {activeTab === "soap" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 text-xs text-brand-ink"
            >
              <div>
                <span className="font-extrabold uppercase tracking-wider text-brand-teal text-[10px] block mb-0.5">
                  Subjective
                </span>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium text-slate-700">
                  54yo male with exertional chest tightness x 3 days. Pain is
                  retrosternal, radiating to left shoulder, triggered by
                  climbing stairs. No diaphoresis or syncope.
                </p>
              </div>

              <div>
                <span className="font-extrabold uppercase tracking-wider text-brand-teal text-[10px] block mb-0.5">
                  Objective
                </span>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-brand-ink/5 p-2 rounded-lg text-center font-semibold">
                    <span className="block text-slate-400 text-[9px]">BP</span>{" "}
                    138/86 mmHg
                  </div>
                  <div className="bg-brand-ink/5 p-2 rounded-lg text-center font-semibold">
                    <span className="block text-slate-400 text-[9px]">HR</span>{" "}
                    78 bpm
                  </div>
                  <div className="bg-brand-ink/5 p-2 rounded-lg text-center font-semibold">
                    <span className="block text-slate-400 text-[9px]">
                      SpO2
                    </span>{" "}
                    98% Ambient
                  </div>
                </div>
              </div>

              <div>
                <span className="font-extrabold uppercase tracking-wider text-brand-teal text-[10px] block mb-0.5">
                  Assessment & Plan
                </span>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium text-slate-700">
                  1. Chest Pain (R07.9) - Order 12-lead ECG immediately. 2.
                  Hypertension (I10) - Continue Lisinopril 10mg daily.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "codes" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Automated ICD-10 Medical Diagnosis Codes
              </div>
              <div className="space-y-2">
                {icd10Codes.map((item) => (
                  <div
                    key={item.code}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-teal transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-brand-ink/10 text-brand-ink border border-slate-200 rounded font-mono font-bold text-xs">
                        {item.code}
                      </span>
                      <span className="text-xs font-semibold text-brand-ink">
                        {item.desc}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full">
                      Confidence {item.confidence}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 pt-1">
                Suggested CPT Billing Procedure Codes
              </div>
              <div className="space-y-2">
                {cptCodes.map((item) => (
                  <div
                    key={item.code}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-brand-teal text-white rounded font-mono font-bold text-xs">
                        CPT {item.code}
                      </span>
                      <span className="text-xs font-semibold text-brand-ink">
                        {item.desc}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">
                      RVU {item.RVU}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "transcript" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 text-xs"
            >
              {conversationLines.map((line, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5"
                >
                  <span className="font-extrabold text-brand-teal block text-[10px] uppercase">
                    {line.speaker}
                  </span>
                  <p className="text-slate-700 font-medium">{line.text}</p>
                </div>
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
