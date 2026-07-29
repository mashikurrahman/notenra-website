"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Key, EyeOff, Server, CheckCircle2, Award } from "lucide-react";

export function SecuritySection() {
  const securityFeatures = [
    {
      title: "HIPAA Compliant & BAA Included",
      description: "Full compliance with HIPAA Security & Privacy Rules. Business Associate Agreements (BAA) executed instantly for all medical practices.",
      icon: ShieldCheck,
      badge: "HIPAA Compliant",
    },
    {
      title: "SOC 2 Type II Certified",
      description: "Independently audited controls validating enterprise-grade operational security, availability, and confidential data processing.",
      icon: Award,
      badge: "SOC 2 Type II",
    },
    {
      title: "Bank-Grade Encryption",
      description: "All protected health information (PHI) is encrypted in transit using TLS 1.3 and at rest with AES-256 cryptographic standards.",
      icon: Lock,
      badge: "AES-256 & TLS 1.3",
    },
    {
      title: "Zero LLM Data Retention",
      description: "Strict privacy architecture: your patient consultations and clinical notes are never stored or used to train third-party AI models.",
      icon: EyeOff,
      badge: "Zero Training Guarantee",
    },
    {
      title: "Role-Based Access Control (RBAC)",
      description: "Granular administrative privileges, single sign-on (SSO/SAML 2.0), and multi-factor authentication across your entire clinic.",
      icon: Key,
      badge: "SSO / SAML 2.0",
    },
    {
      title: "Immutable Audit Logs",
      description: "Comprehensive event logging capturing every view, edit, export, and EHR sync event for seamless compliance reporting.",
      icon: Server,
      badge: "Full Audit Trails",
    },
  ];

  return (
    <section id="security" className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            Healthcare security built for total trust.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Designed to satisfy the strictest enterprise healthcare standards.
          </p>
        </div>

        {/* 6 Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0E7C93]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-cyan text-white flex items-center justify-center shadow-md shadow-[#0E7C93]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#0E7C93]/10 text-[#0E7C93] text-xs font-bold border border-[#0E7C93]/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1B3F60] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#1B3F60]">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7C93]" />
                  <span>Enterprise Security Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
