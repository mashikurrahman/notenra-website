"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "Family Medicine",
    practiceSize: "2-5 Physicians",
    notes: "",
  });

  const specialties = [
    "Family Medicine",
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Psychiatry",
    "Internal Medicine",
    "Pediatrics",
    "Oncology",
    "Other Specialty",
  ];

  const practiceSizes = [
    "Independent Physician (1)",
    "Private Clinic (2-5)",
    "Multi-location Practice (6-15)",
    "Medical Group (16-50)",
    "Healthcare Organization (50+)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0F3355", "#007F8B", "#4ACCCE", "#FF7A5C"],
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-ink/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="surface-navy px-6 py-5 text-white flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-teal/30 border border-brand-teal-200 text-brand-aqua text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalized Practice Demo</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Experience NOTENRA Live
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-sm text-slate-600">
                See how NOTENRA combines AI medical scribing with expert
                clinical human review to save 2.8+ hours daily.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name & Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Sarah Jenkins, MD"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sjenkins@cardiologygroup.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Primary Specialty
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                  >
                    {specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Practice Size
                  </label>
                  <select
                    value={formData.practiceSize}
                    onChange={(e) =>
                      setFormData({ ...formData, practiceSize: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                  >
                    {practiceSizes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  EHR System / Special Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Epic, AthenaHealth, Cerner integration standard..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg surface-teal text-white font-semibold text-sm shadow-lg hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Confirm Live Demo Booking</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                  HIPAA Compliant & BAA Included
                </span>
                <span>&bull;</span>
                <span>No Credit Card Required</span>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-brand-aqua/20 border border-brand-aqua rounded-full flex items-center justify-center mx-auto text-brand-teal">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-bold text-brand-ink">
                Demo Confirmed!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you,{" "}
                <strong className="text-brand-ink">
                  {formData.name || "Doctor"}
                </strong>
                . Our clinical workflow specialist has received your request for{" "}
                <strong>{formData.specialty}</strong>. We will reach out to{" "}
                <span className="text-brand-teal">{formData.email}</span> within
                2 hours.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto text-left space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-medium text-brand-ink">
                  <Calendar className="w-4 h-4 text-brand-teal" />
                  <span>Next Step: Calendar Invitation</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-brand-ink">
                  <UserCheck className="w-4 h-4 text-brand-teal" />
                  <span>Assigned Clinical Expert: Dr. Marcus Vance, MD</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-lg bg-brand-ink text-white font-semibold text-xs hover:bg-[#123659] transition-colors"
              >
                Done & Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
