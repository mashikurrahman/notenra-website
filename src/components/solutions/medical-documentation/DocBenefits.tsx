"use client";

import { motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  RefreshCw,
  HeartPulse,
  Scale,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    stat: "2.8 hrs",
    statLabel: "returned per physician, per day",
    title: "The evening backlog disappears",
    body: "Notes are finished before the clinic day ends. No charting after dinner, no weekend catch-up queue.",
  },
  {
    icon: ShieldCheck,
    stat: "99.4%",
    statLabel: "documentation accuracy",
    title: "Accuracy you can attest to",
    body: "Every note passes a certified clinical reviewer before it reaches you — so what you sign reflects what happened.",
  },
  {
    icon: RefreshCw,
    stat: "40+",
    statLabel: "EHR platforms supported",
    title: "Lands in the chart, not a clipboard",
    body: "Structured output syncs through FHIR/HL7 into Epic, Cerner, Athena and more. Nothing to copy or re-key.",
  },
  {
    icon: HeartPulse,
    stat: "100%",
    statLabel: "attention on the patient",
    title: "Eye contact comes back",
    body: "No keyboard between clinician and patient. The encounter is a conversation again, not a data-entry session.",
  },
  {
    icon: Scale,
    stat: "Zero",
    statLabel: "training on your patient data",
    title: "Compliance built in, not bolted on",
    body: "HIPAA compliant and SOC 2 Type II certified, with a BAA executed for every practice and full audit logging.",
  },
  {
    icon: Users,
    stat: "15 min",
    statLabel: "onboarding per clinician",
    title: "Adoption without a project plan",
    body: "No installation, no IT rollout, no workflow rebuild. Clinicians start on day one with the tools they already carry.",
  },
];

export function DocBenefits() {
  return (
    <section
      id="benefits"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-hero-grid opacity-40 pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            What changes for your practice.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Documentation stops being the reason clinicians stay late.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-brand-teal-200 hover:border-brand-teal-200 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-2xl surface-teal text-white flex items-center justify-center shadow-xs  group-hover:scale-110 transition-all mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-extrabold tracking-tight text-accent">
                    {b.stat}
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                    {b.statLabel}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-ink mb-2 group-hover:text-brand-teal transition-colors">
                  {b.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {b.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
