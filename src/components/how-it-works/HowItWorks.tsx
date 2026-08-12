"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  VolumeX,
  Volume2,
  Clipboard,
  Check,
  Activity,
  Sparkles,
} from "lucide-react";

interface HowItWorksProps {
  /** Optional file path to a real product recording MP4. 
   * If provided, the media section will load the native video player instead. */
  videoSrc?: string;
}

export function HowItWorks({ videoSrc }: HowItWorksProps) {
  // Timeline playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 12 seconds
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const fullTranscript =
    "Patient is a 54-year-old male presenting with a 3-day history of sharp chest pain radiating to his left shoulder, accompanied by mild dyspnea and diaphoresis on moderate exertion. No palpitations or syncope. Vitals: BP 134/82, HR 78, Temp 98.4. Plan schedule cardiac stress test and check troponin.";

  // Sync animation timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 12) return 0; // loop back to 0
          return Math.min(prev + 0.1, 12);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync activeStep with currentTime (4 stages, 3 seconds each)
  useEffect(() => {
    const stepIdx = Math.min(Math.floor(currentTime / 3), 3);
    setActiveStep(stepIdx);
  }, [currentTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    setCurrentTime(clickPercent * 12);
  };

  const handleStepClick = (idx: number) => {
    setCurrentTime(idx * 3);
    setIsPlaying(false); // Pause so the user can inspect the step details
  };

  const handleCopy = () => {
    const noteText = `SUBJECTIVE: 54yo M with 3-day history of sharp left shoulder-radiating chest pain. Accompanied by mild dyspnea & diaphoresis on moderate exertion. Neg for palpitations/syncope.
OBJECTIVE: Vitals: BP 134/82, HR 78, Temp 98.4.
ASSESSMENT: Angina pectoris, unspecified (ICD-10: I20.9).
PLAN: Schedule cardiac stress test, check troponin levels.`;
    navigator.clipboard.writeText(noteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Typewriter transcription substring based on current time (0s - 3s range)
  const currentTranscriptSubstring = () => {
    if (currentTime < 3) {
      const percent = currentTime / 3;
      return fullTranscript.substring(0, Math.floor(fullTranscript.length * percent));
    }
    return fullTranscript;
  };

  // Formatted seconds count: e.g. 00:04
  const formattedSeconds = () => {
    const sec = Math.floor(currentTime);
    return `00:${sec < 10 ? "0" + sec : sec}`;
  };

  const steps = [
    {
      number: "01",
      title: "Capture Conversation",
      subtitle: "Ambient Listening",
      description:
        "Place your device on the desk and speak naturally with the patient. NOTENRA filters out background noise.",
      details: ["Zero manual typing or templates", "Multi-speaker detection"],
      icon: Mic,
    },
    {
      number: "02",
      title: "AI Creates Documentation",
      subtitle: "Instant Synthesis",
      description:
        "Within seconds, NOTENRA structures the dialogue into a clinical SOAP note with coding recommendations.",
      details: ["Practice-specific SOAP structures", "Automated ICD-10 suggestions"],
      icon: Cpu,
    },
    {
      number: "03",
      title: "Clinical Experts Review",
      subtitle: "Human-in-the-Loop",
      description:
        "Our board-certified experts perform audit compliance checks to guarantee medical accuracy.",
      details: ["Zero hallucination guarantee", "Audit trail & HIPAA compliance"],
      icon: ShieldCheck,
    },
    {
      number: "04",
      title: "Ready for EHR & Billing",
      subtitle: "1-Click Direct Sync",
      description:
        "Review, approve, and sign off. Notes and codes flow directly into your EHR (Epic, Cerner, Athenahealth).",
      details: ["Bi-directional API writeback", "Direct export to billing claims"],
      icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            How NOTENRA works.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Four steps from ambient conversation to a signed, coded note. Click any step to inspect the demo.
          </p>
        </div>

        {/* 2-Column Fused Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => handleStepClick(idx)}
                  className={`w-full text-left p-5 rounded-3xl transition-all duration-300 border cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-slate-50 border-brand-teal text-brand-ink shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg ${
                          isActive
                            ? "bg-brand-teal text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        Step {step.number}
                      </span>
                      <h3 className="text-sm font-extrabold text-brand-ink">
                        {step.title}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-brand-teal/10 text-brand-teal"
                          : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal pl-0.5">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Custom Video Demonstration Player */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[580px] bg-brand-ink border border-white/5 shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between aspect-video min-h-[380px]">
              
              {/* Native Video Mode Overlay (If videoSrc is supplied) */}
              {videoSrc ? (
                <div className="absolute inset-0 z-40 bg-black">
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                /* Simulated Visuals Screen */
                <div className="flex-1 relative p-6 sm:p-8 flex flex-col justify-center select-none">
                  <AnimatePresence mode="wait">
                    
                    {/* Screen 1: Recording & Transcribing (0s - 3s) */}
                    {currentTime >= 0 && currentTime < 3 && (
                      <motion.div
                        key="transcribe"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6 w-full"
                      >
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-brand-teal animate-pulse" />
                            Ambient Scribing Active
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase tracking-wider animate-pulse">
                            REC
                          </span>
                        </div>

                        {/* Transcript Typewriter Display */}
                        <div className="min-h-[140px] bg-white/5 border border-white/10 rounded-2xl p-4 font-mono text-[12px] leading-relaxed text-white/80">
                          {currentTranscriptSubstring()}
                          <span className="inline-block w-1 h-3.5 bg-brand-teal ml-0.5 animate-pulse" />
                        </div>

                        {/* Soundwave Lines */}
                        <div className="h-6 flex items-center justify-center gap-1">
                          {[...Array(14)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={
                                isPlaying
                                  ? { height: [8, Math.random() * 24 + 6, 8] }
                                  : { height: 8 }
                              }
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.04,
                              }}
                              className="w-1 rounded-full bg-brand-teal/80"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Screen 2: Processing & Analyzing (3s - 6s) */}
                    {currentTime >= 3 && currentTime < 6 && (
                      <motion.div
                        key="analyze"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-4 py-8"
                      >
                        <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                            Structuring Encounter
                          </p>
                          <p className="text-[10px] text-white/40">
                            Converting conversational audio...
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Screen 3: Clinical Quality Audit Review (6s - 9s) */}
                    {currentTime >= 6 && currentTime < 9 && (
                      <motion.div
                        key="review"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-5 py-6"
                      >
                        <div className="w-16 h-16 bg-brand-teal/15 border border-brand-teal/40 rounded-full flex items-center justify-center mx-auto text-brand-teal">
                          <ShieldCheck className="w-9 h-9" />
                        </div>
                        <div className="space-y-1 max-w-sm mx-auto">
                          <p className="text-sm font-bold text-white">
                            Certified Clinical Audit Verified
                          </p>
                          <p className="text-[10.5px] text-white/55 leading-relaxed">
                            Zero-hallucination review approved by a board-certified clinical documentation reviewer.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Screen 4: Output Done & Sync (9s - 12s) */}
                    {currentTime >= 9 && currentTime <= 12 && (
                      <motion.div
                        key="output"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 w-full text-white/80"
                      >
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                          <span className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                            SOAP Note Structured & Coded
                          </span>
                          <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold tracking-wider uppercase cursor-pointer"
                          >
                            {copied ? (
                              <Check className="w-3 h-3 text-brand-teal" />
                            ) : (
                              <Clipboard className="w-3 h-3" />
                            )}
                            {copied ? "Copied" : "Copy SOAP"}
                          </button>
                        </div>

                        {/* Note SOAP Blocks */}
                        <div className="space-y-3 font-mono text-[10px] leading-relaxed max-h-[160px] overflow-y-auto pr-2 text-left">
                          <div>
                            <span className="text-brand-teal font-extrabold text-[9px] uppercase tracking-wider">
                              SUBJECTIVE:
                            </span>
                            <p className="mt-0.5">
                              54yo M with 3-day history of sharp chest pain radiating to left shoulder. Accompanied by mild dyspnea & diaphoresis. Neg for palpitations/syncope.
                            </p>
                          </div>
                          <div>
                            <span className="text-brand-teal font-extrabold text-[9px] uppercase tracking-wider">
                              OBJECTIVE:
                            </span>
                            <p className="mt-0.5">Vitals: BP 134/82, HR 78, Temp 98.4.</p>
                          </div>
                          <div>
                            <span className="text-brand-teal font-extrabold text-[9px] uppercase tracking-wider">
                              ASSESSMENT & PLAN:
                            </span>
                            <p className="mt-0.5">
                              Angina pectoris (I20.9). Schedule cardiac stress test, check troponin.
                            </p>
                          </div>
                        </div>

                        {/* Sync Check */}
                        <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[9px]">
                          <div className="flex items-center gap-2">
                            <span className="text-white/35 font-bold uppercase tracking-wider">
                              Billing suggestion:
                            </span>
                            <span className="px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal border border-brand-teal-500/20 font-bold font-mono">
                              ICD-10: I20.9
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-brand-teal font-bold uppercase tracking-wider">
                            Synced to Epic
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Player Video Control Bar */}
              <div className="bg-black/60 backdrop-blur-md border-t border-white/5 px-4 py-3 flex items-center justify-between gap-4 z-10 select-none">
                {/* Play / Pause */}
                <button
                  onClick={handlePlayPause}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white text-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  )}
                </button>

                {/* Progress bar timeline seeker */}
                <div
                  onClick={handleSeek}
                  className="flex-1 h-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer relative group transition-all"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-brand-teal rounded-full"
                    style={{ width: `${(currentTime / 12) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md border border-brand-teal opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${(currentTime / 12) * 100}% - 6px)` }}
                  />
                </div>

                {/* Time Indicator */}
                <span className="text-[10px] font-mono text-white/50 tracking-wider">
                  {formattedSeconds()} / 00:12
                </span>

                {/* Extras: Volume toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
