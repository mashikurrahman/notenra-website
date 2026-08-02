"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UiSoapNote } from "./UiSoapNote";
import { MedicalWaveform } from "./MedicalWaveform";

export function HeroCinematicVisual() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      {/* Base Editorial Photography.
          Hero.tsx renders this whole column `hidden lg:flex` inside a
          max-w-[540px] box, so the slot is always 540px when it exists at all.
          Without an explicit `sizes`, `fill` defaults to 100vw and the browser
          picks a 1200px+ candidate for a 540px slot. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-doctor.jpg"
          alt="Physician consulting with patient in modern clinic"
          fill
          sizes="540px"
          className="object-cover object-center"
          priority
        />
        {/* Soft elegant gradient overlay to ensure UI elements pop and text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 via-brand-navy/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
      </div>

      {/* Floating Medical Waveform */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-8 left-8 glass-panel p-4 rounded-2xl flex items-center gap-4"
        style={{ transform: "translateZ(30px)" }} // Fake 3D depth hint
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            Ambient Capture
          </span>
          <span className="text-sm font-semibold text-white">
            Listening...
          </span>
        </div>
        <div className="h-8 w-[1px] bg-white/20 mx-2" />
        <MedicalWaveform bars={12} color="bg-brand-aqua" className="scale-75" />
      </motion.div>

      {/* Floating SOAP Note UI */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-8 lg:-right-4 xl:right-8"
      >
        <UiSoapNote className="animate-float" />
      </motion.div>
    </div>
  );
}
