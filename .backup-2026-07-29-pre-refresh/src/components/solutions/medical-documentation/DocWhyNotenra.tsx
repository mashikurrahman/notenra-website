"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ShieldCheck, Lock, EyeOff, FileCheck } from "lucide-react";

const contrasts = [
  {
    point: "Review model",
    others: "AI output goes straight to the physician to catch its own errors",
    notenra: "A board-certified reviewer checks every note before it reaches you",
  },
  {
    point: "Accuracy claim",
    others: "Accuracy measured on sampled or self-scored output",
    notenra: "99.4% verified against the encounter, every note, not a sample",
  },
  {
    point: "Note structure",
    others: "Fixed templates you adapt your practice to",
    notenra: "Your existing house style, learned and reproduced",
  },
  {
    point: "Data handling",
    others: "Audio retained; patient data may train shared models",
    notenra: "Audio discarded after synthesis; zero training on your data",
  },
  {
    point: "EHR delivery",
    others: "Copy and paste from a separate window",
    notenra: "Bi-directional FHIR/HL7 sync into the chart with codes attached",
  },
];

const compliance = [
  { icon: ShieldCheck, label: "HIPAA compliant", detail: "BAA executed with every practice" },
  { icon: FileCheck, label: "SOC 2 Type II", detail: "Independently audited controls" },
  { icon: Lock, label: "AES-256 & TLS 1.3", detail: "Encrypted at rest and in transit" },
  { icon: EyeOff, label: "Zero data retention", detail: "Never used to train third-party models" },
];

export function DocWhyNotenra() {
  return (
    <section id="why" className="py-24 sm:py-32 bg-white relative overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            Why practices choose NOTENRA.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Most AI scribes stop at the draft. The difference is what happens after it.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="pb-6 border-b border-slate-200">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                Typical AI Scribe
              </div>
              <h3 className="text-2xl font-bold text-slate-700">Draft and hand off</h3>
            </div>

            <div className="space-y-5">
              {contrasts.map((item) => (
                <div
                  key={item.point}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-slate-200/60 last:border-0 last:pb-0"
                >
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">{item.point}</span>
                    <span>{item.others}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-surface-teal border border-[#4ACCCE]/45 rounded-3xl p-8 space-y-6 shadow-lg shadow-[#0E7C93]/10 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-cyan" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#4ACCCE]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="pb-6 border-b border-[#0E7C93]/15 relative z-10">
              <div className="text-xs font-extrabold text-[#0E7C93] uppercase tracking-widest mb-1">
                NOTENRA
              </div>
              <h3 className="text-2xl font-bold text-[#1B3F60]">Draft, review, then deliver</h3>
            </div>

            <div className="space-y-5 relative z-10">
              {contrasts.map((item) => (
                <div
                  key={item.point}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-[#0E7C93]/10 last:border-0 last:pb-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0E7C93] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1B3F60] block mb-0.5">{item.point}</span>
                    <span>{item.notenra}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {compliance.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0E7C93]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0E7C93]/10 text-[#0E7C93] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[#1B3F60] mb-1">{c.label}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{c.detail}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
