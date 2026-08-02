import { Reveal } from "@/components/ui/Reveal";
import {
  Mic,
  FileText,
  Sparkles,
  CreditCard,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { UiPatientTimeline } from "../visuals/UiPatientTimeline";
import { UiCodingSuggestion } from "../visuals/UiCodingSuggestion";
import { UiScribeVisual } from "../visuals/UiScribeVisual";
import { UiBillingVisual } from "../visuals/UiBillingVisual";
import { UiPayrollVisual } from "../visuals/UiPayrollVisual";
import { UiExpertVisual } from "../visuals/UiExpertVisual";

export function FeatureGrid() {
  const features = [
    {
      id: "documentation",
      title: "AI Medical Scribe",
      tagline: "Ambient Voice Intelligence",
      description:
        "Captures the patient-clinician conversation in real time and structures it into medical facts.",
      icon: Mic,
      Visual: UiScribeVisual,
    },
    {
      id: "clinical-docs",
      title: "Clinical Documentation",
      tagline: "Instant Structured Notes",
      description:
        "Generates SOAP notes and H&Ps in seconds, synced directly to Epic, Athena, and Cerner.",
      icon: FileText,
      Visual: UiPatientTimeline,
    },
    {
      id: "coding",
      title: "Medical Coding Engine",
      tagline: "Autonomous ICD-10 & CPT",
      description:
        "Automates diagnostic and procedural coding with 99.4% precision against CMS guidelines.",
      icon: Sparkles,
      Visual: UiCodingSuggestion,
    },
    {
      id: "billing",
      title: "Medical Billing Support",
      tagline: "Pre-Claim Denial Prevention",
      description:
        "Flags missing modifiers and unbundled codes before claims reach your billing software.",
      icon: CreditCard,
      Visual: UiBillingVisual,
    },
    {
      id: "payroll",
      title: "Revenue & Payroll Intelligence",
      tagline: "Predictive Analytics",
      description:
        "Tracks physician RVU productivity and compensation data across every practice location.",
      icon: BarChart3,
      Visual: UiPayrollVisual,
    },
    {
      id: "human-expert",
      title: "Human Expert Quality Layer",
      tagline: "Clinician-in-the-Loop",
      description:
        "Certified clinical reviewers audit edge cases for 100% compliance and zero hallucination risk.",
      icon: ShieldCheck,
      Visual: UiExpertVisual,
    },
  ];

  return (
    <section
      id="platform"
      className="py-10 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Solutions built for the full clinical workflow.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            From conversation to clean claim, one platform handles
            documentation, coding, billing, and payroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              /* Reveal owns the entry transform. The hover lift lives on the
                 inner card so the two transforms never fight over the same
                 element — and as plain CSS it was the only thing here that
                 needed framer-motion's `whileHover`. */
              <Reveal key={f.id} delay={idx * 80} className="scroll-mt-28">
                <div
                  id={f.id}
                  className="group relative h-full bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-teal/20 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* UI Visual inside the card */}
                  <div className="w-full h-36 mb-6 rounded-xl overflow-hidden relative group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                    <f.Visual />
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-brand-teal transition-colors">
                      {f.tagline}
                    </div>
                    <Icon className="w-4 h-4 text-brand-teal/50" />
                  </div>

                  <h3 className="text-[19px] font-bold text-brand-ink mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed font-normal">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
