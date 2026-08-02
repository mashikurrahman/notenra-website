"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, FileCheck2, Sparkles, Activity } from "lucide-react";
import { useRef } from "react";

export function VisionSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);

  return (
    <section 
      ref={containerRef}
      className="py-24 sm:py-32 bg-slate-50 overflow-hidden border-y border-slate-200"
    >
      <div className="page-container">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Column: Copy */}
          <div className="flex-1 max-w-2xl lg:max-w-none">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-6"
            >
              Our Vision
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight leading-[1.1] mb-6"
            >
              The freedom to choose <br className="hidden sm:block" />
              <span className="text-brand-teal">how you document.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 text-[17px] text-slate-600 leading-relaxed font-normal"
            >
              <p>
                At NOTENRA, we believe technology should invisibly shoulder the administrative burden, returning the focus entirely to patient care. Yet, no two practices operate exactly alike.
              </p>
              <p>
                That is why we have engineered a flexible clinical documentation platform designed around your unique workflow. Whether you require autonomous AI scribe capabilities, precision-driven human documentation, or a hybrid model combining the best of both worlds, our platform adapts to your clinical environment. 
              </p>
              <p>
                We do not mandate a single way to practice medicine. We provide the infrastructure, intelligence, and flexibility to let your organization chart its own path forward.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10"
            >
              <button className="px-7 py-3.5 rounded-full border border-slate-200 text-brand-ink text-sm font-bold hover:border-brand-teal hover:text-brand-teal transition-colors inline-flex items-center gap-2 group">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Custom Illustration */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
              <motion.div className="w-full h-full relative" style={{ y: imgY }}>
                <Image
                  src="/images/vision.png"
                  alt="Physician and patient with floating AI documentation"
                  fill
                  className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-brand-teal/5 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </motion.div>
              
              {/* Floating UI 1: SOAP Preview */}
              <motion.div 
                style={{ y: floatY1 }}
                className="absolute top-10 -left-6 sm:left-4 glass-card bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-xl w-48"
              >
                <div className="flex items-center gap-2 text-brand-teal mb-2">
                  <FileCheck2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">SOAP Generated</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-slate-200 rounded" />
                  <div className="h-2 w-5/6 bg-slate-200 rounded" />
                  <div className="h-2 w-4/6 bg-slate-200 rounded" />
                </div>
              </motion.div>

              {/* Floating UI 2: Status */}
              <motion.div 
                style={{ y: floatY2 }}
                className="absolute bottom-16 -right-4 sm:right-6 glass-card bg-white/90 backdrop-blur-xl p-3.5 rounded-xl border border-white/50 shadow-lg flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                  <span className="text-xs font-bold text-brand-ink">Syncing to EHR...</span>
                </div>
              </motion.div>

              {/* Neural/AI Lines SVG Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
                <path d="M0,50 Q100,100 200,50 T400,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-teal" />
                <path d="M100,300 Q250,200 400,250 T600,200" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-400" />
              </svg>
            </div>
            
            {/* Soft background glows */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-teal/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
