"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Clipboard,
  Check,
  CheckCircle2,
  ListRestart,
  Activity,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface ScribeSimulatorProps {
  /** Optional file path to a real product recording MP4. 
   * If provided, the simulator will load the native video player instead. */
  videoSrc?: string;
}

export function ScribeSimulator({ videoSrc }: ScribeSimulatorProps) {
  // Timeline playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 12 seconds
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    setCurrentTime(clickPercent * 12);
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

  // Typewriter transcription substring based on current time (0s - 4s range)
  const currentTranscriptSubstring = () => {
    if (currentTime < 4) {
      const percent = currentTime / 4;
      return fullTranscript.substring(0, Math.floor(fullTranscript.length * percent));
    }
    return fullTranscript;
  };

  // Formatted seconds count: e.g. 00:04
  const formattedSeconds = () => {
    const sec = Math.floor(currentTime);
    return `00:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Scribing Features & Value Props */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
                Encounter Scribe
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
                Continuous Ambient Charting
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                NOTENRA captures ambient conversational clinical audio and compiles it into structured documentation.
              </p>
            </div>

            {/* Steps & Lifecycle Indicators */}
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Ambient Scribe Mode",
                  desc: "Start a visit, place your phone on the desk, and speak naturally with the patient.",
                  isActive: currentTime >= 0 && currentTime < 4,
                },
                {
                  step: "02",
                  title: "AI Synthesis & Crosschecks",
                  desc: "Raw transcripts are cleaned and cross-referenced with your specialty guidelines.",
                  isActive: currentTime >= 4 && currentTime < 6,
                },
                {
                  step: "03",
                  title: "Instant Structured Output",
                  desc: "A fully formatted SOAP note with recommended billing codes ready to sync directly into your EHR.",
                  isActive: currentTime >= 6 && currentTime <= 12,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    item.isActive
                      ? "bg-white border-brand-teal shadow-xs"
                      : "bg-transparent border-transparent opacity-60"
                  }`}
                >
                  <span className="text-xs font-bold text-brand-teal font-mono">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                    
                    {/* Screen 1: Recording & Transcribing (0s - 4s) */}
                    {currentTime >= 0 && currentTime < 4 && (
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

                    {/* Screen 2: Processing & Analyzing (4s - 6s) */}
                    {currentTime >= 4 && currentTime < 6 && (
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

                    {/* Screen 3: Output Done (6s - 12s) */}
                    {currentTime >= 6 && currentTime <= 12 && (
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
                            SOAP Note Structured
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
                        <div className="space-y-3 font-mono text-[10.5px] leading-relaxed max-h-[160px] overflow-y-auto pr-2">
                          <div>
                            <span className="text-brand-teal font-extrabold text-[9px] uppercase tracking-wider">
                              SUBJECTIVE:
                            </span>
                            <p className="mt-0.5">
                              54yo M with 3-day history of sharp chest pain radiating to left shoulder. Accompanied by mild dyspnea & diaphoresis. Neg for palpitations/syncope.
                            </p>
                          </div>
                          {currentTime >= 8 && (
                            <div>
                              <span className="text-brand-teal font-extrabold text-[9px] uppercase tracking-wider">
                                OBJECTIVE:
                              </span>
                              <p className="mt-0.5">Vitals: BP 134/82, HR 78, Temp 98.4.</p>
                            </div>
                          )}
                          {currentTime >= 10 && (
                            <div>
                              <span className="text-brand-teal font-extrabold text-[9px] uppercase tracking-wider">
                                ASSESSMENT & PLAN:
                              </span>
                              <p className="mt-0.5">
                                Angina pectoris (I20.9). Schedule cardiac stress test, check troponin.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Codes */}
                        {currentTime >= 11 && (
                          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[9px]">
                            <span className="text-white/35 font-bold uppercase tracking-wider">
                              Billing suggestion:
                            </span>
                            <span className="px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal border border-brand-teal-500/20 font-bold font-mono">
                              ICD-10: I20.9
                            </span>
                          </div>
                        )}
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
