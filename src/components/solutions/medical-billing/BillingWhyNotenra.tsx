"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  ShieldCheck,
  Lock,
  LineChart,
  FileCheck,
} from "lucide-react";

const contrasts = [
  {
    point: "When errors are caught",
    others: "After the payer rejects the claim",
    notenra: "Before the claim is transmitted, while it is still an edit",
  },
  {
    point: "Denial handling",
    others: "Resubmitted as-is and hoped through on the second pass",
    notenra: "Triaged by root cause, appealed, then prevented at the source",
  },
  {
    point: "Coding handoff",
    others: "Codes arrive from a separate vendor with no clinical context",
    notenra: "Codes arrive reviewed, with the documentation that supports them",
  },
  {
    point: "Payment review",
    others: "Payment posted as received — the payer's number is final",
    notenra: "Posted against your contract, with underpayments appealed",
  },
  {
    point: "Visibility",
    others: "A monthly report that arrives too late to act on",
    notenra: "Per-claim status and blockers visible while they still matter",
  },
];

const compliance = [
  {
    icon: ShieldCheck,
    label: "HIPAA compliant",
    detail: "BAA executed with every practice",
  },
  {
    icon: FileCheck,
    label: "SOC 2 Type II",
    detail: "Independently audited controls",
  },
  {
    icon: Lock,
    label: "AES-256 & TLS 1.3",
    detail: "Encrypted at rest and in transit",
  },
  {
    icon: LineChart,
    label: "Auditable trail",
    detail: "Every claim action logged and attributable",
  },
];

export function BillingWhyNotenra() {
  return (
    <section
      id="why"
      className="py-10 sm:py-16 bg-white relative overflow-hidden scroll-mt-28"
    >
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            Why practices move billing here.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Most billing services are measured on how well they work denials.
            The better measure is how few there are to work.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="pb-6 border-b border-slate-200">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                Typical billing service
              </div>
              <h3 className="text-2xl font-bold text-slate-700">
                Submit, then chase
              </h3>
            </div>

            <div className="space-y-5">
              {contrasts.map((item) => (
                <div
                  key={item.point}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">
                      {item.point}
                    </span>
                    <span>{item.others}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-brand-teal-200 rounded-3xl p-8 space-y-6 shadow-xs relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 surface-teal" />

            <div className="pb-6 border-b border-brand-teal-100 relative z-10">
              <div className="text-xs font-extrabold text-brand-teal uppercase tracking-widest mb-1">
                NOTENRA
              </div>
              <h3 className="text-2xl font-bold text-brand-ink">
                Scrub, then submit
              </h3>
            </div>

            <div className="space-y-5 relative z-10">
              {contrasts.map((item) => (
                <div
                  key={item.point}
                  className="flex items-start gap-3 text-xs text-slate-600 pb-4 border-b border-brand-teal-100 last:border-0 last:pb-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-ink block mb-0.5">
                      {item.point}
                    </span>
                    <span>{item.notenra}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* One-record argument */}
        <div className="bg-[linear-gradient(135deg,#2563EB_0%,#1D4ED8_100%)] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-10">
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/80">
              One clinical record
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3 leading-tight">
              Billing is only as good as what reaches it.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mt-5">
              A billing team working from codes it cannot trace spends its day
              reconstructing context. When documentation, coding, and billing
              share one record, the claim arrives already supportable.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 grid gap-4 content-center">
            {[
              {
                stage: "Documentation",
                body: "The encounter is captured and clinician-reviewed.",
              },
              {
                stage: "Coding",
                body: "Codes are assigned from that record and verified by a certified coder.",
              },
              {
                stage: "Billing",
                body: "The claim is scrubbed against payer rules with the supporting evidence already attached.",
              },
            ].map((row, idx) => (
              <motion.div
                key={row.stage}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg surface-teal text-white flex items-center justify-center text-xs font-extrabold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-ink">
                    {row.stage}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    {row.body}
                  </p>
                </div>
              </motion.div>
            ))}
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
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-brand-teal-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-brand-ink mb-1">
                  {c.label}
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  {c.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
