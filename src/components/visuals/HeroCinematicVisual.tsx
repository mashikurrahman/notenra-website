"use client";

import { motion } from "framer-motion";
import { UiSoapNote } from "./UiSoapNote";
import { MedicalWaveform } from "./MedicalWaveform";

/* The hero visual used to be a stock photograph of a smiling woman in a white
   coat, shot outdoors under a tree, buried under two navy gradients with these
   same UI cards floating on top.

   Two problems with that. It was a posed portrait standing in for a physician
   who does not exist — thin ground for a healthcare brand asking clinicians to
   trust it with PHI. And functionally the photo was only ever a dark backdrop:
   cropped to a 540px column and covered by /60 and /40 navy washes, the only
   thing it contributed was texture, while a face looking at camera pulled
   focus from the product UI that carries the actual message.

   So the backdrop is now drawn rather than photographed, and the product is
   the subject. The composition reads top-left to bottom-right as the pitch
   itself: the room is being listened to, speech resolves into transcript,
   transcript resolves into a coded note. */
export function HeroCinematicVisual() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-brand-navy">
      {/* Drawn backdrop: brand navy with depth from two blurred brand-colour
          pools and a fine dot grid, so the panel reads as a surface rather
          than a flat block. No image request, no LCP cost. */}
      {/* Authentic Editorial Clinical Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
          alt="Clinical consulting space"
          className="w-full h-full object-cover"
        />
        {/* Semi-transparent brand navy wash for high contrast & text readability */}
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(11,27,58,0.45)_0%,rgba(19,45,85,0.5)_52%,rgba(11,27,58,0.45)_100%)]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute -top-20 -left-12 w-72 h-72 rounded-full bg-brand-teal/30 blur-[90px]" />
      <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-brand-aqua/20 blur-[100px]" />

      {/* Ambient capture — the input.
          Uses glass-panel-dark, not glass-panel. The original had white text on
          .glass-panel, which is rgba(255,255,255,0.75) — white on near-white,
          effectively invisible. The dark variant is the one built for white
          copy. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-8 left-8 glass-panel-dark p-4 rounded-2xl flex items-center gap-4"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            Ambient Capture
          </span>
          <span className="text-sm font-semibold text-white">Listening…</span>
        </div>
        <div className="h-8 w-px bg-white/20 mx-2" />
        <MedicalWaveform bars={12} color="bg-brand-aqua" className="scale-75" />
      </motion.div>

      {/* Live transcript — the middle of the story. Without this the panel
          jumps straight from "listening" to a finished note and the product's
          actual work is invisible. */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-36 left-8 right-16 glass-panel-dark rounded-2xl px-4 py-3.5"
      >
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">
          Transcript
        </div>
        <p className="text-[13px] leading-relaxed text-white/85">
          <span className="text-brand-aqua font-semibold">Patient:</span> It
          started about three days ago, after I lifted some heavy boxes…
        </p>
      </motion.div>

      {/* Structured output — the payoff. */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-8 lg:-right-4 xl:right-8"
      >
        <UiSoapNote className="animate-float" />
      </motion.div>
    </div>
  );
}
