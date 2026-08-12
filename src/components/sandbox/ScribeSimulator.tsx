"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Square,
  Sparkles,
  Clipboard,
  Check,
  RefreshCw,
  Clock,
  HeartPulse,
} from "lucide-react";

type ScribeStatus = "idle" | "recording" | "processing" | "done";

export function ScribeSimulator() {
  const [status, setStatus] = useState<ScribeStatus>("idle");
  const [transcriptText, setTranscriptText] = useState("");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fullTranscript =
    "Patient is a 54-year-old male presenting with a 3-day history of sharp chest pain radiating to his left shoulder, accompanied by mild dyspnea and diaphoresis on moderate exertion. No palpitations or syncope. Vitals: BP 134/82, HR 78, Temp 98.4. Plan schedule cardiac stress test and check troponin.";

  useEffect(() => {
    if (status === "recording") {
      let index = 0;
      setTranscriptText("");
      
      // Typewriter simulation
      timerRef.current = setInterval(() => {
        if (index < fullTranscript.length) {
          setTranscriptText(fullTranscript.substring(0, index + 3));
          index += 3;
        } else {
          clearInterval(timerRef.current!);
          setStatus("processing");
        }
      }, 40);
    } else if (status === "processing") {
      // Show processing spinner for 1.8 seconds before done
      timerRef.current = setTimeout(() => {
        setStatus("done");
      }, 1800);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        clearTimeout(timerRef.current);
      }
    };
  }, [status]);

  const handleStart = () => {
    setStatus("recording");
  };

  const handleReset = () => {
    setStatus("idle");
    setTranscriptText("");
    setCopied(false);
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

  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="page-container">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
            SOAP Note Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            See how NOTENRA structures clinical voice.
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Experience the real-time conversion of chaotic ambient physician dictation into formatted SOAP notes complete with coding recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-6xl mx-auto">
          {/* Left Panel: Scribing Capture */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Clinical Audio Input
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    status === "recording"
                      ? "bg-red-50 text-red-600 animate-pulse border border-red-100"
                      : status === "processing"
                      ? "bg-brand-teal/10 text-brand-teal border border-brand-teal-100/50"
                      : status === "done"
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}
                >
                  {status === "idle" && "Ready"}
                  {status === "recording" && "Recording Encounter"}
                  {status === "processing" && "AI Processing"}
                  {status === "done" && "Finished"}
                </span>
              </div>

              {/* Dictation Box */}
              <div className="min-h-[160px] bg-slate-50 rounded-2xl p-5 border border-slate-200/60 font-mono text-[12.5px] leading-relaxed text-slate-700 relative">
                {status === "idle" && (
                  <p className="text-slate-400 italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                    Click &ldquo;Record Encounter&rdquo; to start simulating dictation.
                  </p>
                )}
                {transcriptText}
                {status === "recording" && (
                  <span className="inline-block w-1.5 h-4 bg-brand-teal ml-1 animate-pulse" />
                )}
              </div>
            </div>

            {/* Audio Waveform / Controls */}
            <div className="space-y-6">
              {status === "recording" && (
                <div className="h-10 flex items-center justify-center gap-1">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [12, Math.random() * 32 + 10, 12],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.03,
                      }}
                      className="w-1.5 rounded-full bg-brand-teal"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center gap-4">
                {status === "idle" && (
                  <button
                    onClick={handleStart}
                    className="px-6 py-3.5 bg-brand-teal hover:bg-brand-teal-deep text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    Record Encounter
                  </button>
                )}

                {(status === "recording" || status === "processing" || status === "done") && (
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 border border-slate-200 hover:border-brand-teal text-slate-600 hover:text-brand-teal font-bold text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer bg-white"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: SOAP Note Output */}
          <div className="bg-brand-ink rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl text-white flex flex-col justify-between min-h-[360px]">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white/45 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                  Structured SOAP Output
                </span>
                {status === "done" && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-[11px] font-bold tracking-wider uppercase cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-brand-teal" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy SOAP
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Note Display Container */}
              <div className="relative min-h-[220px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-white/35 italic space-y-2 py-8"
                    >
                      <Sparkles className="w-8 h-8 mx-auto text-white/10 mb-2" />
                      <p className="text-xs">
                        Awaiting encounter recording compilation.
                      </p>
                    </motion.div>
                  )}

                  {status === "recording" && (
                    <motion.div
                      key="recording"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-white/45 space-y-3 py-8"
                    >
                      <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-mono">Listening and transcribing...</p>
                    </motion.div>
                  )}

                  {status === "processing" && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-brand-teal space-y-3 py-8"
                    >
                      <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Generating SOAP structure & coding suggestions
                      </p>
                    </motion.div>
                  )}

                  {status === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 font-mono text-[11px] leading-relaxed text-white/80"
                    >
                      <div className="space-y-1">
                        <span className="text-brand-teal font-extrabold text-[10px] uppercase tracking-wider">
                          SUBJECTIVE:
                        </span>
                        <p>
                          54yo M with 3-day history of sharp chest pain radiating to left shoulder. Accompanied by mild dyspnea & diaphoresis on moderate exertion. Neg for palpitations/syncope.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-brand-teal font-extrabold text-[10px] uppercase tracking-wider">
                          OBJECTIVE:
                        </span>
                        <p>Vitals: BP 134/82, HR 78, Temp 98.4.</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-brand-teal font-extrabold text-[10px] uppercase tracking-wider">
                          ASSESSMENT:
                        </span>
                        <p>
                          Angina pectoris, unspecified (ICD-10: I20.9).
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-brand-teal font-extrabold text-[10px] uppercase tracking-wider">
                          PLAN:
                        </span>
                        <p>
                          Schedule cardiac stress test, check troponin levels.
                        </p>
                      </div>

                      {/* Code Highlights */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5 text-[10px]">
                        <span className="text-white/40 font-bold uppercase tracking-wider">
                          Suggested Billing:
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-brand-teal/10 text-brand-teal border border-brand-teal-500/20">
                          ICD-10: I20.9
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-brand-teal/10 text-brand-teal border border-brand-teal-500/20">
                          CPT: 99214
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
