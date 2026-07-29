"use client";

import { motion } from "framer-motion";
import { Mic, FileText, Sparkles, CreditCard, BarChart3, ShieldCheck } from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      id: "documentation",
      title: "AI Medical Scribe",
      tagline: "Ambient Voice Intelligence",
      description: "Captures the patient-clinician conversation in real time and structures it into medical facts.",
      icon: Mic,
    },
    {
      id: "clinical-docs",
      title: "Clinical Documentation",
      tagline: "Instant Structured Notes",
      description: "Generates SOAP notes and H&Ps in seconds, synced directly to Epic, Athena, and Cerner.",
      icon: FileText,
    },
    {
      id: "coding",
      title: "Medical Coding Engine",
      tagline: "Autonomous ICD-10 & CPT",
      description: "Automates diagnostic and procedural coding with 99.4% precision against CMS guidelines.",
      icon: Sparkles,
    },
    {
      id: "billing",
      title: "Medical Billing Support",
      tagline: "Pre-Claim Denial Prevention",
      description: "Flags missing modifiers and unbundled codes before claims reach your billing software.",
      icon: CreditCard,
    },
    {
      id: "payroll",
      title: "Revenue & Payroll Intelligence",
      tagline: "Predictive Analytics",
      description: "Tracks physician RVU productivity and compensation data across every practice location.",
      icon: BarChart3,
    },
    {
      id: "human-expert",
      title: "Human Expert Quality Layer",
      tagline: "Clinician-in-the-Loop",
      description: "Certified clinical reviewers audit edge cases for 100% compliance and zero hallucination risk.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="platform" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            Solutions built for the full clinical workflow.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            From conversation to clean claim, one platform handles documentation, coding, billing, and payroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                id={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="scroll-mt-28 group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#0E7C93]/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0E7C93] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-2xl bg-gradient-cyan text-white flex items-center justify-center shadow-md shadow-[#0E7C93]/20 group-hover:scale-110 transition-all mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0E7C93] mb-1">
                  {f.tagline}
                </div>
                <h3 className="text-2xl font-bold text-[#1B3F60] mb-3 group-hover:text-[#0E7C93] transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
