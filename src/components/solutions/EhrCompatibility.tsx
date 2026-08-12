"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Database,
  Cpu,
  Zap,
  Activity,
  ArrowRight,
} from "lucide-react";

interface EhrDetails {
  name: string;
  type: string;
  speed: string;
  setup: string;
  writeback: string;
  description: string;
}

export function EhrCompatibility() {
  const ehrData: Record<string, EhrDetails> = {
    Epic: {
      name: "Epic Systems",
      type: "FHIR API & HL7 Connection",
      speed: "Real-time sync",
      setup: "Standard Config (3-5 days)",
      writeback: "Bi-directional smart writeback",
      description:
        "Leverages standard Epic App Orchard FHIR APIs to securely pull practitioner schedule lists, fetch patient demographics, and push structured clinical notes directly into the chart in real-time.",
    },
    Cerner: {
      name: "Oracle Cerner",
      type: "FHIR API & direct HL7 feed",
      speed: "Sub-second writeback",
      setup: "Standard Config (4-7 days)",
      writeback: "Bi-directional smart writeback",
      description:
        "Connects securely using Oracle Cerner Millennium APIs, allowing automated clinical note updates and synchronizing coding suggestions directly into the EHR workflow.",
    },
    Athenahealth: {
      name: "Athenahealth",
      type: "Direct API Integration",
      speed: "Real-time sync",
      setup: "Plug & Play (24 Hours)",
      writeback: "Automated encounter closeout",
      description:
        "Connects directly using Athena's Developer Portal APIs. Offers immediate plug-and-play scheduling sync and automated note pushing without internal IT assistance.",
    },
    eClinicalWorks: {
      name: "eClinicalWorks",
      type: "HL7 Interface & Chrome Extension",
      speed: "On-demand sync",
      setup: "Assisted Setup (5-7 days)",
      writeback: "Direct window paste writeback",
      description:
        "Integrates using direct HL7 clinical document channels combined with our lightweight browser companion to auto-populate note fields inside eClinicalWorks screens.",
    },
    NextGen: {
      name: "NextGen Healthcare",
      type: "FHIR API & database connector",
      speed: "Real-time sync",
      setup: "Assisted Setup (5-7 days)",
      writeback: "Bi-directional smart writeback",
      description:
        "Leverages standard NextGen API gateways. Note documents, ICD-10 diagnosis codes, and CPT billing suggestions flow directly into NextGen charts upon encounter confirmation.",
    },
    Veradigm: {
      name: "Veradigm (Allscripts)",
      type: "Direct Unity API connection",
      speed: "Real-time sync",
      setup: "Standard Config (3-5 days)",
      writeback: "Encounter note insertion",
      description:
        "Uses Veradigm Unity APIs to fetch active physician schedules and push fully structured SOAP document payloads into the EHR without interrupting existing clinical interfaces.",
    },
  };

  const [selectedEhr, setSelectedEhr] = useState<string>("Epic");
  const current = ehrData[selectedEhr];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            EHR Integration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Compatibilty with your existing EHR.
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            NOTENRA sits on top of your existing workflows, connecting directly into your current EHR system to ensure clinical continuity without disruptive data migrations.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dropdown List */}
          <div className="md:col-span-4 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Your System
            </label>
            {Object.keys(ehrData).map((key) => {
              const isSelected = selectedEhr === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedEhr(key)}
                  className={`w-full px-5 py-4 rounded-2xl text-left font-semibold text-sm transition-all flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? "bg-slate-50 border-brand-teal text-brand-ink shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>{ehrData[key].name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-teal" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Integration details */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEhr}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-brand-ink">
                    {current.name} Integration Profile
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {current.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Sync Interface
                      </h4>
                      <p className="text-sm font-semibold text-brand-ink mt-0.5">
                        {current.type}
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Deployment Time
                      </h4>
                      <p className="text-sm font-semibold text-brand-ink mt-0.5">
                        {current.setup}
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Sync Speed
                      </h4>
                      <p className="text-sm font-semibold text-brand-ink mt-0.5">
                        {current.speed}
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Writeback Level
                      </h4>
                      <p className="text-sm font-semibold text-brand-ink mt-0.5">
                        {current.writeback}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
