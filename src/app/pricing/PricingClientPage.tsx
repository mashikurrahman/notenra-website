"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  Plus, 
  Minus, 
  Check, 
  Clock, 
  FileText, 
  Activity, 
  Users, 
  Cpu, 
  Scale, 
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Which documentation solution is right for my practice?",
    a: "If you are a solo practitioner seeking a fast, self-service drafting tool, the AI Documentation plan is ideal. If you run a growing clinic and want documentation pre-vetted by trained medical specialists before export, choose the Hybrid plan. For larger groups with custom EHR configurations and specific templates, select our Enterprise custom solution."
  },
  {
    q: "Can I upgrade, downgrade, or switch plans later?",
    a: "Yes. You can adjust your tier at any time directly through your dashboard. Plan modifications take effect on your next billing cycle. If you transition to a Hybrid or Custom plan, our customer success team will assist with onboarding your specialists."
  },
  {
    q: "What happens if I exceed my monthly note limit?",
    a: "Additional notes on the AI and Hybrid plans are billed at a flexible volume-based rate. We will alert you when you reach 80% and 100% of your tier limit so you can adjust your configuration if necessary."
  },
  {
    q: "Can Medical Coding be purchased as a standalone service?",
    a: "Yes. Our professional CPT and ICD-10 coding service is available independently. You do not need to use NOTENRA documentation workflows to utilize our certified coding audits and queue submissions."
  },
  {
    q: "Can Medical Billing be purchased as a standalone service?",
    a: "Yes. End-to-end revenue cycle and claims management services can be purchased independently to optimize reimbursement workflows for your current billing team."
  },
  {
    q: "Can I combine Documentation, Coding, and Billing?",
    a: "Absolutely. Combining all three provides a fully integrated clinical pipeline, automatically moving ambient consultation notes through human-vetted coding audits directly to claim submissions, maximizing efficiency."
  },
  {
    q: "Do you support custom clinical workflows?",
    a: "Yes. For our Custom Enterprise tier, our engineers write tailored integrations, custom templates, and FHIR data maps matching your organization's exact documentation preferences."
  },
  {
    q: "Do you sign a Business Associate Agreement (BAA)?",
    a: "Yes. NOTENRA executes a standard BAA with every practice group before any audio processing or EHR data sync occurs, guaranteeing HIPAA-aligned safeguards."
  },
  {
    q: "How are backups and clinical data secured?",
    a: "All records are encrypted at rest with AES-256 keys and in transit with TLS 1.3. Incremental daily backups are partitioned across multiple secure AWS availability zones."
  },
  {
    q: "Is there a setup or onboarding fee?",
    a: "Standard AI tiers require zero setup fees. Hybrid and Custom plans include a dedicated onboarding phase to configure templates, align specialists, and map EHR fields, covered under your custom kickoff structure."
  }
];

export function PricingClientPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Questionnaire trigger state
  const [selectedPracticeType, setSelectedPracticeType] = useState<string>("");

  // Calculator states
  const [notesCount, setNotesCount] = useState<number>(500);
  const [calcWorkflow, setCalcWorkflow] = useState<"ai" | "hybrid" | "custom">("ai");
  const [calcSpecialty, setCalcSpecialty] = useState<string>("Family Medicine");

  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleQuestionnaireSelect = (type: "ai" | "hybrid" | "custom") => {
    setSelectedPracticeType(type);
    
    // Set matching calculator defaults
    setCalcWorkflow(type);
    if (type === "ai") setNotesCount(500);
    else if (type === "hybrid") setNotesCount(1000);
    else setNotesCount(5000);

    // Smooth scroll to matching tier element
    const element = document.getElementById(`tier-${type}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Dynamic ROI Calculator computations
  const getCalculatorOutputs = () => {
    let recommendedPlan = "AI Documentation";
    let estInvestment = "$499/mo";
    let hoursSaved = "35 hrs/mo";
    let adminReduction = "45%";

    if (calcWorkflow === "custom" || notesCount >= 5000) {
      recommendedPlan = "Custom Enterprise";
      estInvestment = "Contact Sales";
      hoursSaved = "220+ hrs/mo";
      adminReduction = "80%";
    } else if (calcWorkflow === "hybrid" || notesCount >= 1000) {
      recommendedPlan = "Hybrid Documentation";
      const basePrice = notesCount === 1000 ? 1499 : 2499;
      estInvestment = `$${basePrice}/mo`;
      hoursSaved = notesCount === 1000 ? "75 hrs/mo" : "150 hrs/mo";
      adminReduction = "65%";
    } else {
      // AI plan
      const basePrice = notesCount <= 250 ? 299 : 499;
      estInvestment = `$${basePrice}/mo`;
      hoursSaved = notesCount <= 250 ? "18 hrs/mo" : "38 hrs/mo";
      adminReduction = "40%";
    }

    return { recommendedPlan, estInvestment, hoursSaved, adminReduction };
  };

  const { recommendedPlan, estInvestment, hoursSaved, adminReduction } = getCalculatorOutputs();

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink selection:bg-brand-teal/20">
      <Header onOpenDemo={handleOpenDemo} />

      {/* Hero Section */}
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-24 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        
        <div className="page-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Left: Copy */}
            <div className="flex-1 space-y-8 text-left max-w-2xl lg:max-w-none">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
                Pricing &amp; Workflows
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.08]">
                Pricing That Fits <br />
                The Way Your <span className="text-brand-teal">Practice Works.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                Every healthcare practice is different. Whether you are looking for AI-powered documentation, a hybrid workflow supported by experienced medical specialists, or a customized enterprise solution, NOTENRA adapts to your clinical, operational, and financial needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#workflow-questionnaire"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-teal text-white text-[15px] font-bold shadow-md hover:bg-brand-teal-deep hover:-translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
                >
                  Find Your Solution
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={handleOpenDemo}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-brand-ink text-[15px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Book a Demo
                </button>
              </div>
            </div>

            {/* Right: Localized pricing hero */}
            <div className="flex-1 w-full relative max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                <Image
                  src="/images/pricing-hero.jpg"
                  alt="Doctor consulting notes on tablet in private practice clinic"
                  fill
                  className="object-cover scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-brand-teal/5 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Recommendation Questionnaire */}
      <section id="workflow-questionnaire" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Selection Helper
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Find Your Documentation Solution
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              What best describes your practice and clinical documentation needs?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <button
              onClick={() => handleQuestionnaireSelect("ai")}
              className={`text-left p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
                selectedPracticeType === "ai"
                  ? "bg-white border-brand-teal shadow-xl scale-[1.02]"
                  : "bg-white/60 border-slate-200 hover:border-brand-teal-200 hover:bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">AI-Powered Only</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                I want fast, automated SOAP note drafting directly in the room with solo physician configurations.
              </p>
            </button>

            {/* Card 2 */}
            <button
              onClick={() => handleQuestionnaireSelect("hybrid")}
              className={`text-left p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
                selectedPracticeType === "hybrid"
                  ? "bg-white border-brand-teal shadow-xl scale-[1.02]"
                  : "bg-white/60 border-slate-200 hover:border-brand-teal-200 hover:bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">AI + Specialists</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                I need ambient AI backed by clinical specialists reviewing note templates for total chart precision.
              </p>
            </button>

            {/* Card 3 */}
            <button
              onClick={() => handleQuestionnaireSelect("custom")}
              className={`text-left p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
                selectedPracticeType === "custom"
                  ? "bg-white border-brand-teal shadow-xl scale-[1.02]"
                  : "bg-white/60 border-slate-200 hover:border-brand-teal-200 hover:bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">Custom Workflow</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                I represent a medical group or clinic network with specific template parameters and EHR mappings.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Pricing Cards (Documentation Solutions) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Pricing Options
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Documentation Solutions
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Select the pricing plan that corresponds with your operational scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Card 1: AI Documentation */}
            <div 
              id="tier-ai"
              className={`glass-card bg-slate-50 border border-slate-200 p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 ${
                selectedPracticeType === "ai" ? "border-brand-teal ring-2 ring-brand-teal/10 bg-white" : ""
              }`}
            >
              <div className="space-y-6">
                <span className="px-2.5 py-1 rounded-full bg-slate-200/50 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Best for Small Practices
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-ink">AI Documentation</h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                    Solo physician configurations needing fast, self-service note drafting.
                  </p>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-slate-500 text-xs font-semibold">Starting at</span>
                  <span className="text-4xl font-black text-brand-ink">$499</span>
                  <span className="text-slate-500 text-xs font-semibold">/month</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-200/70 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Up to 500 notes / month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> AI Ambient Summarization
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Structured SOAP templates
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Secure HIPAA platform
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Standard Turnaround
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Standard Email Support
                  </li>
                </ul>
              </div>
              <div className="pt-8 space-y-3">
                <button 
                  onClick={handleOpenDemo}
                  className="w-full py-3 px-6 rounded-xl bg-brand-teal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-teal-deep transition-colors"
                >
                  Start Your Journey
                </button>
                <div className="text-[10px] text-slate-400 text-center font-normal">
                  Flexible volume-based expansions available.
                </div>
              </div>
            </div>

            {/* Card 2: Hybrid Documentation */}
            <div 
              id="tier-hybrid"
              className={`glass-card bg-slate-50 border border-slate-200 p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 relative ${
                selectedPracticeType === "hybrid" ? "border-brand-teal ring-2 ring-brand-teal/10 bg-white" : ""
              }`}
            >
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-brand-teal text-white text-[9px] font-extrabold uppercase tracking-widest">
                Most Popular
              </div>
              <div className="space-y-6">
                <span className="px-2.5 py-1 rounded-full bg-brand-teal/10 text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                  AI + Specialists
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-ink">Hybrid Documentation</h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                    AI speed audited by clinical experts to assure absolute accuracy.
                  </p>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-slate-500 text-xs font-semibold">Starting at</span>
                  <span className="text-4xl font-black text-brand-ink">$1,499</span>
                  <span className="text-slate-500 text-xs font-semibold">/month</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-200/70 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Up to 2,000 notes / month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Certified Human Reviewers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Custom templates &amp; formats
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Priority Turnaround
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Dedicated Onboarding
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Priority Support (Email &amp; Slack)
                  </li>
                </ul>
              </div>
              <div className="pt-8 space-y-3">
                <button 
                  onClick={handleOpenDemo}
                  className="w-full py-3 px-6 rounded-xl bg-brand-teal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-teal-deep transition-colors shadow-sm"
                >
                  Book a Demo
                </button>
                <div className="text-[10px] text-slate-400 text-center font-normal">
                  Custom pricing for high-volume groups.
                </div>
              </div>
            </div>

            {/* Card 3: Custom Solutions */}
            <div 
              id="tier-custom"
              className={`glass-card bg-slate-50 border border-slate-200 p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 ${
                selectedPracticeType === "custom" ? "border-brand-teal ring-2 ring-brand-teal/10 bg-white" : ""
              }`}
            >
              <div className="space-y-6">
                <span className="px-2.5 py-1 rounded-full bg-slate-200/50 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Enterprise
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-ink">Custom Solutions</h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                    Designed for clinical networks needing custom EHR integrations.
                  </p>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-brand-ink">Contact Sales</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-200/70 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Unlimited note volume
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Dedicated CDI expert queue
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Custom EHR/FHIR integrations
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Tailored clinical templates
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Premium SLA guarantees
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-brand-teal" /> Dedicated Customer Success
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button 
                  onClick={handleOpenDemo}
                  className="w-full py-3 px-6 rounded-xl bg-brand-ink text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Expand Your Clinical Workflow */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Additional Services
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              More Than Documentation
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Medical Coding and Medical Billing can be integrated into any documentation plan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Coding */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-ink">Medical Coding</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Professional CPT and ICD-10 coding services designed to improve coding accuracy, streamline claim submissions, and support cleaner reimbursement.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-teal" /> Certified Coding Specialists</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-teal" /> Specialty Coding Adjustments</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-teal" /> Live Documentation Audits</li>
                </ul>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pricing</div>
                  <div className="text-lg font-bold text-brand-ink">Custom Quote</div>
                </div>
                <button 
                  onClick={handleOpenDemo}
                  className="py-2.5 px-5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-brand-ink text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Request Pricing
                </button>
              </div>
            </div>

            {/* Billing */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-ink">Medical Billing</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  End-to-end revenue cycle support designed to improve cash flow, reduce coding delays, and lower administrative workload.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-teal" /> Claims Processing &amp; Submissions</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-teal" /> Denial Management audits</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-teal" /> Real-time Revenue Reporting</li>
                </ul>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pricing</div>
                  <div className="text-lg font-bold text-brand-ink">Custom Quote</div>
                </div>
                <button 
                  onClick={handleOpenDemo}
                  className="py-2.5 px-5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-brand-ink text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Request Pricing
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 mt-8 font-normal">
            Coding and Billing can be purchased independently or added to any NOTENRA documentation solution.
          </div>
        </div>
      </section>

      {/* Section 5: Estimate Your Monthly Needs (ROI Calculator) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="page-container max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              ROI &amp; Estimates
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Estimate Your Monthly Needs
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Select your documentation volume and workflow preferences to evaluate time saved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch border border-slate-200 rounded-[32px] bg-slate-50/50 p-8">
            {/* Inputs (Left) */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-brand-ink uppercase tracking-wider">
                  <span>Estimated Monthly Notes</span>
                  <span className="text-brand-teal">{notesCount === 5000 ? "5,000+" : `${notesCount} Notes`}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="5000" 
                  step="50" 
                  value={notesCount} 
                  onChange={(e) => setNotesCount(parseInt(e.target.value))}
                  className="w-full accent-brand-teal cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                  <span>100</span>
                  <span>1,000</span>
                  <span>2,000</span>
                  <span>5,000+</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-bold text-brand-ink uppercase tracking-wider">Preferred Workflow</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "ai", label: "AI" },
                    { id: "hybrid", label: "Hybrid" },
                    { id: "custom", label: "Custom" }
                  ].map((wf) => (
                    <button
                      key={wf.id}
                      onClick={() => setCalcWorkflow(wf.id as any)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                        calcWorkflow === wf.id
                          ? "bg-white border-brand-teal text-brand-teal shadow-2xs"
                          : "bg-white/60 border-slate-200 text-slate-500 hover:bg-white"
                      }`}
                    >
                      {wf.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-bold text-brand-ink uppercase tracking-wider">Specialty</span>
                <select 
                  value={calcSpecialty} 
                  onChange={(e) => setCalcSpecialty(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-teal"
                >
                  <option>Family Medicine</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Dermatology</option>
                  <option>Psychiatry</option>
                  <option>Internal Medicine</option>
                </select>
              </div>
            </div>

            {/* Outputs (Right) */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Recommended Plan</div>
                  <div className="text-base font-extrabold text-brand-ink">{recommendedPlan}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Monthly Investment</div>
                  <div className="text-2xl font-black text-brand-teal">{estInvestment}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Time Saved</div>
                  <div className="text-base font-bold text-brand-ink">{hoursSaved}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Admin Reduction</div>
                  <div className="text-base font-bold text-brand-ink">{adminReduction}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Why Practices Choose NOTENRA */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="page-container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              Benefits
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Why Practices Choose NOTENRA
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Clinical excellence combined with cutting-edge architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card bg-white border border-slate-200 p-8 rounded-3xl space-y-3">
              <h3 className="text-lg font-bold text-brand-ink">Flexible Documentation Models</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Choose the workflow that fits. Toggle between ambient AI-powered drafting for standard visits, or human-audited notes for complex consultations.
              </p>
            </div>

            <div className="glass-card bg-white border border-slate-200 p-8 rounded-3xl space-y-3">
              <h3 className="text-lg font-bold text-brand-ink">Healthcare Expertise</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Our platform and support specialist groups are managed directly by clinical documentation improvement (CDI) practitioners and HIPAA compliance experts.
              </p>
            </div>

            <div className="glass-card bg-white border border-slate-200 p-8 rounded-3xl space-y-3">
              <h3 className="text-lg font-bold text-brand-ink">Scalable Operations</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Add coding, billing, and compensation dashboards as standalone modules or unified pipelines as your clinical networks grow.
              </p>
            </div>

            <div className="glass-card bg-white border border-slate-200 p-8 rounded-3xl space-y-3">
              <h3 className="text-lg font-bold text-brand-ink">Human-Centered Technology</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                We design ambient capturing tools that require zero physician dictation, ensuring patient consultations remain completely natural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-16 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Direct and transparent answers to custom plans, limitations, and upgrades.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/80 bg-slate-50 rounded-2xl overflow-hidden transition-all duration-300"
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
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/40 pt-4">
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
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="page-container relative z-10 text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
            Let&apos;s Build the Right Documentation <br />
            <span className="text-brand-teal">Workflow for Your Practice.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Whether you are starting with AI-powered documentation or building a fully customized enterprise workflow, our team will help you choose the solution that best fits your practice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleOpenDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-teal text-white text-sm font-bold shadow-md hover:bg-brand-teal-deep hover:-translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleOpenDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-brand-ink text-sm font-bold hover:bg-slate-100 transition-all"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <LazyDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
