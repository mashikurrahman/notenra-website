"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, KeyRound, UserCheck, FileAudio, FileText, Database, Activity, Code } from "lucide-react";

const securityCards = [
  {
    icon: ShieldCheck,
    iconBg: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(92,156,255,0.1))",
    iconColor: "#2563EB",
    title: "HIPAA Compliant",
    description: "End-to-end encryption. BAA provided.",
  },
  {
    icon: Lock,
    iconBg: "linear-gradient(135deg, rgba(63,164,106,0.16), rgba(63,164,106,0.07))",
    iconColor: "#1E7A4C",
    title: "SOC 2 Type II",
    description: "Independently audited annually.",
  },
  {
    icon: KeyRound,
    iconBg: "linear-gradient(135deg, rgba(11,27,58,0.12), rgba(37,99,235,0.08))",
    iconColor: "#0B1B3A",
    title: "256-bit AES",
    description: "Data encrypted at rest and in transit.",
  },
  {
    icon: UserCheck,
    iconBg: "linear-gradient(135deg, rgba(63,164,106,0.12), rgba(37,99,235,0.06))",
    iconColor: "#1E7A4C",
    title: "Zero Trust Access",
    description: "Granular role-based permissions.",
  },
];

/**
 * MedicalSecurityVisual — A modern, Framer Motion-based visualization
 * showing clinical documents orbiting and being securely processed into an EHR vault.
 */
function MedicalSecurityVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] lg:min-h-[440px] flex items-center justify-center">
      {/* Background ECG Pulse */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <Activity className="w-full h-full min-h-[350px] text-brand-ink" />
      </div>

      {/* Orbiting Elements */}
      <div className="absolute w-[260px] h-[260px] lg:w-[380px] lg:h-[380px] rounded-full border border-brand-teal/20 border-dashed animate-[spin_25s_linear_infinite]">
        {/* Node 1: Audio */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl border border-slate-200 shadow-md flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
          <FileAudio className="w-5 h-5 lg:w-7 lg:h-7 text-brand-teal" />
          {/* Secure Lock Badge */}
          <div className="absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 bg-brand-ink rounded-full flex items-center justify-center shadow-sm">
            <Lock className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-white" />
          </div>
        </div>

        {/* Node 2: SOAP Note */}
        <div className="absolute bottom-[15%] right-0 translate-x-[20%] translate-y-[20%] w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl border border-slate-200 shadow-md flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
          <FileText className="w-5 h-5 lg:w-7 lg:h-7 text-brand-teal" />
          <div className="absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 bg-brand-ink rounded-full flex items-center justify-center shadow-sm">
            <Lock className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-white" />
          </div>
        </div>

        {/* Node 3: Medical Codes */}
        <div className="absolute bottom-[15%] left-0 -translate-x-[20%] translate-y-[20%] w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl border border-slate-200 shadow-md flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
          <Code className="w-5 h-5 lg:w-7 lg:h-7 text-brand-teal" />
          <div className="absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 bg-brand-ink rounded-full flex items-center justify-center shadow-sm">
            <Lock className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* Scanning Laser Line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute w-[260px] h-[260px] lg:w-[380px] lg:h-[380px] rounded-full opacity-60"
        style={{
          background: "conic-gradient(from 0deg, transparent 70%, rgba(37,99,235,0.08) 100%)",
        }}
      >
        <div className="absolute top-0 right-1/2 w-[2px] h-1/2 bg-gradient-to-t from-transparent to-brand-teal/30" />
      </motion.div>

      {/* Center EHR Vault */}
      <div className="relative z-10 w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center bg-white shadow-xl border border-slate-100 p-2.5 lg:p-3.5">
        <div className="w-full h-full rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0B1B3A, #2563EB)",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_50%)]" />
          <Database className="w-6 h-6 lg:w-10 lg:h-10 text-white/90 mb-1 lg:mb-2 relative z-10" />
          <ShieldCheck className="w-4 h-4 lg:w-6 lg:h-6 text-brand-teal relative z-10" />
        </div>
        
        {/* Pulse rings emitting from the vault */}
        <div className="absolute inset-0 rounded-2xl border border-brand-teal/20 animate-ping [animation-duration:3s]" />
      </div>
    </div>
  );
}

export function SecuritySection() {
  return (
    <section
      id="security"
      className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200 overflow-hidden relative"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.03),transparent_50%)] pointer-events-none" />
      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Text + cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-brand-teal"
            >
              Security &amp; Compliance
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold leading-[1.1] tracking-tight text-brand-ink mb-6"
            >
              Built for healthcare&apos;s
              <br />
              strictest requirements.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg font-medium leading-relaxed mb-10 text-slate-500 max-w-lg"
            >
              Clinical data is the most sensitive information that exists.
              NOTENRA treats it accordingly — with architecture designed from
              the ground up for healthcare compliance.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-5"
            >
              {securityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                    key={card.title}
                    className="glass-card rounded-[20px] p-6 border border-slate-200/60 bg-white/60 hover:bg-white hover:border-brand-teal/40 hover:-translate-y-1 transition-all shadow-xs hover:shadow-md cursor-default group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ background: card.iconBg }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: card.iconColor }}
                      />
                    </div>
                    <p className="font-bold text-base text-brand-ink mb-1">
                      {card.title}
                    </p>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Security visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:absolute lg:right-[-10%] lg:top-1/2 lg:-translate-y-1/2 pointer-events-none"
          >
            <div className="relative w-full max-w-[350px] lg:max-w-none lg:w-[500px] lg:h-[500px]">
              <MedicalSecurityVisual />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
