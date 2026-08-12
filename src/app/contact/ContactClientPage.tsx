"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";
import {
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  User,
  Building2,
  Settings,
  Database,
  Cpu,
  FileText,
  FileCheck2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export function ContactClientPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  // Multi-step builder states
  const [step, setStep] = useState(1);
  const [practiceType, setPracticeType] = useState("");
  const [ehr, setEhr] = useState("");
  const [focusTopic, setFocusTopic] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectPractice = (val: string) => {
    setPracticeType(val);
    setStep(2);
  };

  const handleSelectEhr = (val: string) => {
    setEhr(val);
    setStep(3);
  };

  const handleSelectTopic = (val: string) => {
    setFocusTopic(val);
    setStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          email: form.email,
          message: `Practice: ${practiceType} | EHR: ${ehr} | Topic: ${focusTopic} | Message: ${form.message}`,
          company: honeypot,
          startedAt: startedAt.current,
        }),
      });

      const data = await res.json().catch(() => ({ ok: false }));

      if (!res.ok || !data.ok) {
        setError(
          data.error ??
            "Something went wrong sending that. Please email hello@notenra.com."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "We couldn't reach the server. Please check your connection or email hello@notenra.com."
      );
    } finally {
      setSending(false);
    }
  };

  const practiceOptions = [
    { id: "single", label: "Single Provider", desc: "Solo practice or single-clinic office", icon: User },
    { id: "group", label: "Group Practice", desc: "Clinics with 2 to 20 active providers", icon: Building2 },
    { id: "enterprise", label: "Enterprise System", desc: "Hospitals, health networks, and 20+ groups", icon: Settings },
  ];

  const ehrOptions = ["Epic", "Cerner", "Athenahealth", "eClinicalWorks", "NextGen", "Other"];

  const topicOptions = [
    { id: "scribing", label: "Ambient Scribing", desc: "Transcribing patient dialogue into SOAP notes", icon: Cpu },
    { id: "coding", label: "Medical Coding", desc: "ICD-10, CPT generation and compliance checks", icon: FileCheck2 },
    { id: "billing", label: "Pre-Claim Billing", desc: "Claim scrubbing and denial prevention audits", icon: FileText },
    { id: "payroll", label: "Payroll & RVUs", desc: "Provider RVU reconciliation and compensation rules", icon: Database },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      <section className="pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title */}
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Consultation
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
              Build Your Demo Profile.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Configure your practice systems and clinical priorities to tailor your consultation agenda in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Step Configurations */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-xs min-h-[460px]">
              
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Practice Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="text-base font-extrabold text-brand-ink uppercase tracking-wider">
                        Select Practice Scale
                      </h2>
                      <div className="space-y-3">
                        {practiceOptions.map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = practiceType === opt.label;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectPractice(opt.label)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer focus:outline-none ${
                                isSelected
                                  ? "bg-slate-50 border-brand-teal text-brand-ink shadow-2xs"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                              }`}
                            >
                              <div className={`p-2.5 rounded-xl ${isSelected ? "bg-brand-teal text-white" : "bg-slate-50 text-slate-400"}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-extrabold text-brand-ink">{opt.label}</p>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: EHR Interface */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="text-base font-extrabold text-brand-ink uppercase tracking-wider">
                        EHR Interface Compatibility
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {ehrOptions.map((opt) => {
                          const isSelected = ehr === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelectEhr(opt)}
                              className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all h-20 flex items-center justify-center cursor-pointer focus:outline-none ${
                                isSelected
                                  ? "bg-slate-50 border-brand-teal text-brand-teal shadow-2xs"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Main Topic Focus */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="text-base font-extrabold text-brand-ink uppercase tracking-wider">
                        Primary Workflow Goal
                      </h2>
                      <div className="space-y-3">
                        {topicOptions.map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = focusTopic === opt.label;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectTopic(opt.label)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer focus:outline-none ${
                                isSelected
                                  ? "bg-slate-50 border-brand-teal text-brand-ink shadow-2xs"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                              }`}
                            >
                              <div className={`p-2.5 rounded-xl ${isSelected ? "bg-brand-teal text-white" : "bg-slate-50 text-slate-400"}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-extrabold text-brand-ink">{opt.label}</p>
                                <p className="text-xs text-slate-500">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Contact Submit Form */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="text-base font-extrabold text-brand-ink uppercase tracking-wider">
                        Contact Details
                      </h2>
                      
                      {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="Dr. Sarah Jenkins"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Work Email *
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="sjenkins@practice.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Message / Questions
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Any specific questions you want covered during the live system demo..."
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all resize-none"
                            />
                          </div>

                          {/* Honeypot */}
                          <div aria-hidden="true" className="absolute -left-[9999px] top-0">
                            <input
                              type="text"
                              tabIndex={-1}
                              autoComplete="off"
                              value={honeypot}
                              onChange={(e) => setHoneypot(e.target.value)}
                            />
                          </div>

                          {error && (
                            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
                              {error}
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 px-6 rounded-xl bg-brand-teal text-white font-semibold text-xs shadow-xs hover:bg-brand-teal-deep hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer"
                          >
                            <span>{sending ? "Sending Details…" : "Request Tailored Consultation"}</span>
                            {!sending && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                          </button>
                        </form>
                      ) : (
                        <div className="py-8 text-center space-y-4">
                          <div className="w-12 h-12 bg-brand-teal/10 border border-brand-teal-200 rounded-full flex items-center justify-center mx-auto text-brand-teal">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-brand-ink">Profile Compiled</h3>
                          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                            Thank you, {form.name}. A clinical specialist will review your EHR profile and contact you within one business day at {form.email}.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer back button & progress dots */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between select-none">
                <button
                  onClick={handleBack}
                  disabled={step === 1 || submitted}
                  className={`flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-teal transition-colors focus:outline-none ${
                    step === 1 || submitted ? "opacity-0 pointer-events-none" : "cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                
                <span className="text-[10px] font-mono text-slate-400">
                  Step {step} of 4
                </span>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((dot) => (
                    <div
                      key={dot}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dot === step
                          ? "w-6 bg-brand-teal"
                          : dot < step
                          ? "w-2 bg-brand-teal/40"
                          : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Right Side: Demo Agenda Visualizer (spotlight card) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-brand-ink text-white rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-2xl" />
              
              <div className="space-y-6 relative z-10">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-3">
                  <Sparkles className="w-3.5 h-3.5 text-brand-teal animate-pulse" />
                  Tailored Demo Profile
                </span>

                <div className="space-y-4">
                  {/* Scope info */}
                  {practiceType ? (
                    <div>
                      <span className="text-[8px] font-extrabold text-white/30 uppercase tracking-widest block">Practice Scale</span>
                      <p className="text-sm font-bold text-white mt-0.5">{practiceType}</p>
                    </div>
                  ) : null}

                  {/* EHR info */}
                  {ehr ? (
                    <div>
                      <span className="text-[8px] font-extrabold text-white/30 uppercase tracking-widest block">EHR Interface Integration</span>
                      <p className="text-sm font-bold text-white mt-0.5">{ehr} Direct Sync</p>
                    </div>
                  ) : null}

                  {/* Topic info */}
                  {focusTopic ? (
                    <div>
                      <span className="text-[8px] font-extrabold text-white/30 uppercase tracking-widest block">Focus Module</span>
                      <p className="text-sm font-bold text-white mt-0.5">{focusTopic} Optimization</p>
                    </div>
                  ) : null}
                </div>

                {/* Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-white/80">
                  <h4 className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2">Customized Agenda:</h4>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {ehr ? `Inspect direct API writeback rules for ${ehr}` : "Analyze bi-directional FHIR database sync"}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {focusTopic ? `Live code walkthrough of the ${focusTopic} module` : "Review ambient documentation structures"}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Examine zero-hallucination guarantees and HIPAA compliance
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Banner */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3 text-white/50 text-[10px]">
                <Clock className="w-4 h-4 text-brand-teal shrink-0" />
                <p>Tailored overview prepared in 1 business day.</p>
              </div>

            </div>

          </div>

          {/* Core Info Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto text-left select-none">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider">Direct Email</h3>
              <p className="text-sm font-bold text-brand-teal font-mono">hello@notenra.com</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider">Technical Support</h3>
              <p className="text-sm font-bold text-brand-teal font-mono">support@notenra.com</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider">Response Window</h3>
              <p className="text-sm font-bold text-brand-ink">Within 1 business day</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <LazyDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
