"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Server, 
  FileLock2, 
  Users, 
  Plus, 
  Minus,
  ArrowRight,
  Activity,
  CheckCircle2,
  FileText,
  Eye,
  FileCheck2,
  Database,
  Cpu,
  Smartphone,
  Globe,
  Radio,
  FileArchive
} from "lucide-react";
import { Header } from "@/components/header/Header";
import { CtaSection } from "@/components/cta-section/CtaSection";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How is patient information protected?",
    a: "All patient information is processed within isolated, HIPAA-compliant Virtual Private Clouds (VPCs). Audio data is streamed securely via encrypted TLS 1.3 tunnels, processed transiently in memory, and immediately purged once clinical notes are successfully compiled."
  },
  {
    q: "Is my clinical data encrypted at rest and in transit?",
    a: "Yes. All data is encrypted in transit using industry-standard TLS 1.3 (with secure SHA-256 signatures) and at rest using bank-grade AES-256 bit encryption keys managed through secure cloud hardware security modules (HSMs)."
  },
  {
    q: "How do you control internal user access?",
    a: "We implement a strict Zero Trust architecture. Internal systems require multi-factor authentication (MFA) and hardware security tokens. Employee access to operational pipelines is governed by Role-Based Access Control (RBAC) and the Principle of Least Privilege."
  },
  {
    q: "Can I manage user permissions in my clinic?",
    a: "Yes. Our platform includes an enterprise Permission Matrix allowing clinic administrators to customize access levels. You can restrict staff roles to read-only clinical notes, biller access, developer API credentials, or full administration rights."
  },
  {
    q: "How are data backups handled?",
    a: "We perform automated, daily incremental backups of clinical configurations and system logs. Backups are encrypted with unique AES-256 keys and replicated across multiple geographically separated regions to guarantee disaster recovery readiness."
  },
  {
    q: "How is documentation secured when synced to our EHR?",
    a: "Syncing occurs over authenticated, direct FHIR or HL7 API pipelines. We utilize secure OAuth 2.0 authorization codes and custom credentials, ensuring that data is safely written directly to your EHR patient chart without middle-man caching."
  },
  {
    q: "Do you train AI models on my data?",
    a: "Absolutely not. NOTENRA does not train public foundation models, third-party neural networks, or shared language systems on your clinical transcripts or Protected Health Information (PHI)."
  },
  {
    q: "Who reviews the clinical documentation?",
    a: "Depending on your selected workflow (AI-only or Hybrid), clinical documents can be routed to credentialed, HIPAA-trained clinical documentation improvement (CDI) specialists for manual validation before final signature."
  }
];

const protectionFeatures = [
  {
    icon: KeyRound,
    title: "Military-Grade Encryption",
    desc: "TLS 1.3 in-transit and AES-256 at-rest keep transcripts secure.",
  },
  {
    icon: Lock,
    title: "Zero Trust Architecture",
    desc: "MFA, hardware keys, and token rotation govern every operational API.",
  },
  {
    icon: Server,
    title: "Isolated Infrastructure",
    desc: "Dedicated VPCs in secure, HIPAA-aligned hosting environments.",
  },
  {
    icon: Activity,
    title: "Continuous Monitoring",
    desc: "Real-time threat detection, audit logging, and SIEM tracing.",
  },
  {
    icon: Database,
    title: "Redundant Backups",
    desc: "Geographically partitioned daily backups with rapid restoration.",
  },
  {
    icon: FileLock2,
    title: "BAA Guarantee",
    desc: "Strict BAA signed with every provider group to safeguard PHI.",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    desc: "Immutable logs tracking exports, note signature events, and logins.",
  },
  {
    icon: Users,
    title: "Granular RBAC",
    desc: "Custom roles for scribes, clinicians, billers, and admins.",
  },
  {
    icon: ShieldCheck,
    title: "Least Privilege",
    desc: "Access restriction policies ensuring staff only see necessary records.",
  }
];

const workflowSteps = [
  { id: "patient", name: "Patient Audio", icon: Radio, desc: "Provider initiates encrypted ambient capture in-clinic." },
  { id: "transit", name: "TLS Transit", icon: KeyRound, desc: "Audio streamed via TLS 1.3 tunnel to isolated servers." },
  { id: "process", name: "Secure AI Scribe", icon: Cpu, desc: "Transient transcription and summarization in protected memory." },
  { id: "doc", name: "Clinical SOAP", icon: FileText, desc: "Structured EHR-ready documentation compiled and verified." },
  { id: "storage", name: "EHR Sync", icon: Database, desc: "Direct FHIR upload to EHR charts with zero caching." },
  { id: "access", name: "Audit Trail", icon: Eye, desc: "Actions recorded in compliance audit log." },
  { id: "archive", name: "Purge & Archive", icon: FileArchive, desc: "Raw audio destroyed; metadata archived securely." }
];

export function SecurityClientPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<string>("patient");
  const [activeTab, setActiveTab] = useState<"audit" | "matrix" | "sessions">("audit");

  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      {/* Hero Section */}
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-24 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        
        <div className="page-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            
            {/* Left: Hero Copy */}
            <div className="flex-1 space-y-8 text-left max-w-2xl lg:max-w-none">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
                Security &amp; Compliance
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.08]">
                Security Built Into Every <br />
                <span className="text-brand-teal">Clinical Workflow.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                Patient trust starts with data protection. From ambient AI transcription to human-assisted quality review, NOTENRA safeguards sensitive healthcare information with enterprise-grade security practices, modern infrastructure, and a privacy-first architecture.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={handleOpenDemo}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-teal text-white text-[15px] font-bold shadow-md hover:bg-brand-teal-deep hover:-translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
                >
                  Request Security Overview
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleOpenDemo}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-brand-ink text-[15px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Right: Premium Healthcare Photography Visual */}
            <div className="flex-1 w-full relative max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                <Image
                  src="/images/security-clinic.jpg"
                  alt="Physician showing secure digital clinical data on tablet to patient"
                  fill
                  className="object-cover scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-brand-teal/5 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              </div>
              
              {/* Floating trust badges */}
              <div className="absolute -top-6 -left-6 glass-card bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">HIPAA compliant</div>
                  <div className="text-xs font-bold text-brand-ink">BAA Signed Instantly</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Lock className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Encryption</div>
                  <div className="text-xs font-bold text-brand-ink">AES-256 At Rest</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Security Philosophy Section */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Text */}
            <div className="flex-1 space-y-6">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
                Our Security Philosophy
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
                Security is not a feature. <br />
                <span className="text-brand-teal">It is part of every workflow.</span>
              </h2>

              <p className="text-slate-600 leading-relaxed text-base font-normal max-w-xl">
                We believe that security is an active operational requirement, not a checklist completed once a year. That is why NOTENRA designs security directly into our code pipelines, database schemas, and organizational onboarding cycles.
              </p>
            </div>

            {/* Right: Glass Card Philosophy Visual */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="glass-card bg-white border border-slate-200 p-8 sm:p-12 rounded-[40px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-2xl" />
                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <ShieldCheck className="w-6.5 h-6.5" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-ink">The Privacy Promise</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    We strictly restrict access to system environments, audit every note output, and ensure zero customer transcript data leaks back into public AI models. We treat clinical information with the exact same privacy we expect for our own families.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How We Protect Your Data Grid */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Data Safeguards
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              How We Protect Your Data
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              A comprehensive clinical compliance architecture built on robust infrastructure controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {protectionFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div 
                  key={i}
                  className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-4 hover:border-brand-teal-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-ink">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Animated Workflow (Patient Info Lifecycle) */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Lifecycle of Data
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Secure Clinical Data Lifecycle
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Trace how audio flows, encrypts, compiles, and purges securely.
            </p>
          </div>

          {/* Workflow Interactive Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Steps Flow (SVG Path) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {workflowSteps.map((step) => {
                  const Icon = step.icon;
                  const isActive = activeWorkflowStep === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveWorkflowStep(step.id)}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isActive 
                          ? "bg-white border-brand-teal shadow-lg scale-[1.03] z-10" 
                          : "bg-white/60 border-slate-200/70 hover:border-brand-teal-100 hover:bg-white"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-teal" />
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-brand-teal text-white" : "bg-brand-teal/10 text-brand-teal"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-brand-ink tracking-tight">{step.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Details */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
                <AnimatePresence mode="wait">
                  {workflowSteps.map((step) => {
                    if (step.id !== activeWorkflowStep) return null;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <h4 className="text-sm font-bold text-brand-teal uppercase tracking-widest">
                          Stage: {step.name}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* SVG animation and visualization */}
            <div className="lg:col-span-4 flex items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl h-[320px] shadow-sm relative overflow-hidden">
              {/* Particle backgrounds */}
              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
              
              <div className="relative w-full h-full flex flex-col items-center justify-center space-y-6 z-10">
                <div className="relative w-20 h-20">
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-brand-teal/20"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                    <ShieldCheck className="w-10 h-10 animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-brand-ink">Data Flow Active</h4>
                  <p className="text-xs text-slate-500 mt-1">Transient secure transit verified.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Security Architecture Diagram */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="page-container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              System Topography
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Security Architecture
            </h2>
            <p className="text-base text-slate-600 font-normal">
              A secure data gateway connecting clinic endpoints to partitioned EHR databases.
            </p>
          </div>

          {/* Node Diagram layout */}
          <div className="border border-slate-200 rounded-[32px] bg-slate-50/50 p-8 sm:p-12 shadow-sm relative overflow-hidden flex flex-col space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
            
            {/* The nodes pipeline layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center relative z-10">
              
              {/* Node 1: Clinic */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-xs">
                <Smartphone className="w-8 h-8 text-brand-teal mb-3" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">Endpoint</span>
                <span className="text-sm font-bold text-brand-ink">Clinic Network</span>
              </div>

              {/* Node 2: Connection */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-xs relative">
                <Globe className="w-8 h-8 text-blue-500 mb-3" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">Gateway</span>
                <span className="text-sm font-bold text-brand-ink">TLS 1.3 Encryption</span>
              </div>

              {/* Node 3: Cloud Application */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-xs">
                <Cpu className="w-8 h-8 text-brand-teal mb-3" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">Process</span>
                <span className="text-sm font-bold text-brand-ink">Isolated AWS VPC</span>
              </div>

              {/* Node 4: Database */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-xs">
                <Database className="w-8 h-8 text-indigo-500 mb-3" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">Storage</span>
                <span className="text-sm font-bold text-brand-ink">EHR partition (AES-256)</span>
              </div>

            </div>

            {/* Architecture Explainer */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-500 leading-relaxed font-normal">
              <strong>Technical Summary:</strong> Handshakes occur via modern secure socket layers. Data inputs are isolated per clinical organization and mapped through access tokens, preventing database cross-talk and securing medical transcripts against multi-tenant vulnerability vectors.
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Privacy section */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Standards
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Compliance &amp; Privacy
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Designed with HIPAA best practices and strict compliance standards in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="glass-card bg-white border border-slate-200 p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-brand-ink">Designed for HIPAA</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                NOTENRA is designed to support administrative, physical, and technical safeguards. We sign a Business Associate Agreement (BAA) with every provider organization, ensuring complete legal and compliance coverage for PHI.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card bg-white border border-slate-200 p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-brand-ink">Privacy-First Architecture</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Patient transcript data is never stored on public AI infrastructure. All ambient AI analysis is performed transiently inside secure, private VPC servers, and immediately purged once clinical note compilation is complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Security UI Mockups (Interactive Tabs) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="page-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Interactive Menu */}
            <div className="lg:col-span-4 space-y-6">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
                Console Security
              </div>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
                Product Security Controls
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Take control of your clinic security with advanced admin logs, permission grids, and session revoking interfaces.
              </p>

              <div className="flex flex-col gap-2">
                {[
                  { id: "audit", label: "Audit Logs" },
                  { id: "matrix", label: "Permission Matrix" },
                  { id: "sessions", label: "Session Manager" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left border transition-all ${
                      activeTab === tab.id 
                        ? "bg-slate-100 border-slate-300 text-brand-ink shadow-sm" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Mock UI Displays */}
            <div className="lg:col-span-8 p-6 bg-slate-50 border border-slate-200 rounded-[32px] min-h-[360px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <AnimatePresence mode="wait">
                
                {/* Audit Log Mockup */}
                {activeTab === "audit" && (
                  <motion.div
                    key="audit"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-lg space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-brand-ink uppercase tracking-wider">Clinical Audit Log</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 border border-emerald-100">Active</span>
                    </div>
                    <div className="space-y-3 font-mono text-[11px] text-slate-600">
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span>Exported CPT code 99213 - Dr. Sarah Wood</span>
                        <span className="text-slate-400">10:14 AM</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span>Signed SOAP Note - Encounter #98412</span>
                        <span className="text-slate-400">09:44 AM</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span>Integrator authenticated OAuth FHIR API</span>
                        <span className="text-slate-400">08:00 AM</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Permission Matrix Mockup */}
                {activeTab === "matrix" && (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-lg space-y-4 overflow-x-auto"
                  >
                    <span className="text-xs font-bold text-brand-ink uppercase tracking-wider block pb-2 border-b border-slate-100">Role Permissions</span>
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-100">
                          <th className="py-2 font-semibold">Capability</th>
                          <th className="py-2 font-semibold">Clinician</th>
                          <th className="py-2 font-semibold">Biller</th>
                          <th className="py-2 font-semibold">Scribe</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-600 font-medium">
                        <tr className="border-b border-slate-100">
                          <td className="py-2">Create SOAP Note</td>
                          <td className="py-2 text-brand-teal">✓</td>
                          <td className="py-2 text-slate-300">-</td>
                          <td className="py-2 text-brand-teal">✓</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-2">Edit Billing Codes</td>
                          <td className="py-2 text-brand-teal">✓</td>
                          <td className="py-2 text-brand-teal">✓</td>
                          <td className="py-2 text-slate-300">-</td>
                        </tr>
                        <tr>
                          <td className="py-2">Sign Encounters</td>
                          <td className="py-2 text-brand-teal">✓</td>
                          <td className="py-2 text-slate-300">-</td>
                          <td className="py-2 text-slate-300">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {/* Session Manager Mockup */}
                {activeTab === "sessions" && (
                  <motion.div
                    key="sessions"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-lg space-y-4"
                  >
                    <span className="text-xs font-bold text-brand-ink uppercase tracking-wider block pb-2 border-b border-slate-100">Active Sessions</span>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-brand-teal" />
                          <div>
                            <div className="font-bold text-brand-ink">iOS App (iPad Pro)</div>
                            <div className="text-[10px] text-slate-400">IP: 198.162.1.42 • Active Now</div>
                          </div>
                        </div>
                        <button className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:border-red-200 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-wider shadow-2xs">Revoke</button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-slate-400" />
                          <div>
                            <div className="font-bold text-brand-ink">Chrome (Windows Console)</div>
                            <div className="text-[10px] text-slate-400">IP: 172.56.21.90 • 2 hours ago</div>
                          </div>
                        </div>
                        <button className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:border-red-200 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-wider shadow-2xs">Revoke</button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Security FAQ */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Concise explanations of clinical compliance, encryption, and data protection.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left font-bold text-brand-ink hover:text-brand-teal flex items-center justify-between gap-4 transition-colors"
                  >
                    <span>{item.q}</span>
                    <div className="text-slate-400">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <CtaSection
        tone="white"
        onOpenDemo={handleOpenDemo}
        eyebrow="Security You Can Trust"
        headline="Security You Can Trust."
        headlineAccent="Documentation You Can Depend On."
        subhead="Focus on delivering better patient care while we focus on protecting your information with enterprise-grade security practices."
        primaryLabel="Request Security Overview"
        secondary={{
          label: "Book a Demo",
          href: "#",
          icon: ShieldCheck
        }}
      />

      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
