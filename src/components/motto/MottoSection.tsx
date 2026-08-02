"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function MottoSection() {
  return (
    <section className="py-20 sm:py-32 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      
      <div className="page-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Typography */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal mb-8"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.1] mb-6"
            >
              We handle the data. <br className="hidden lg:block" />
              <span className="text-brand-teal">You handle the care.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              The administrative burden in healthcare is unsustainable. Our AI operates silently in the background, fully automating documentation, coding, and billing—so your physicians can focus 100% on their patients.
            </motion.p>
          </div>

          {/* Right Side: Advanced Pipeline Visualization */}
          <div className="flex-1 w-full relative">
            <div className="w-full aspect-square md:aspect-auto md:h-[500px] relative flex items-center justify-center">
              
              {/* Background glows */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] bg-brand-teal/10 rounded-full blur-[80px]" />
                <div className="w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[60px] translate-x-10 translate-y-10" />
              </div>

              {/* The Pipeline Container */}
              <div className="relative w-full h-full max-w-lg mx-auto flex items-center justify-between z-10 px-4 sm:px-8">
                
                {/* SVG Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                  <motion.path
                    d="M 20% 50% C 40% 50%, 40% 50%, 50% 50%"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d="M 50% 50% C 60% 50%, 60% 50%, 80% 50%"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3FA46A" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3FA46A" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Node 1: Unstructured Audio/Notes (Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-[120px] sm:w-[140px] glass-card bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-2xl p-4 relative"
                >
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Raw Input</div>
                  
                  {/* Fake Audio Waveform */}
                  <div className="flex items-center gap-1 h-8 mb-4">
                    {[40, 70, 40, 100, 60, 30, 80, 50, 90, 40].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-slate-300 rounded-full"
                        animate={{ height: [`${h * 0.5}%`, `${h}%`, `${h * 0.5}%`] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>

                  {/* Scribble Text */}
                  <div className="space-y-1.5 opacity-50">
                    <div className="h-1.5 w-full bg-slate-300 rounded" />
                    <div className="h-1.5 w-4/5 bg-slate-300 rounded" />
                    <div className="h-1.5 w-full bg-slate-300 rounded" />
                  </div>
                </motion.div>

                {/* Node 2: The AI Core (Center) */}
                <motion.div 
                  className="relative z-20 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24"
                >
                  {/* Glowing rings */}
                  <motion.div 
                    className="absolute inset-0 border border-brand-teal/30 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute inset-2 border border-brand-teal/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Core */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-brand-teal to-blue-500 rounded-full shadow-[0_0_30px_rgba(63,164,106,0.4)] flex items-center justify-center relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
                    />
                    <Sparkles className="w-6 h-6 text-white relative z-10" />
                  </div>
                </motion.div>

                {/* Node 3: Structured Data (Right) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-[120px] sm:w-[140px] glass-card bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl p-4 relative"
                >
                  <div className="text-[10px] font-bold text-brand-teal uppercase tracking-wider mb-3">Structured</div>
                  
                  {/* Clean Data UI */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-teal/20 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-full bg-slate-200 rounded" />
                        <div className="h-2 w-2/3 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-5/6 bg-slate-200 rounded" />
                        <div className="h-2 w-1/2 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200 flex items-center justify-center mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-full bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
