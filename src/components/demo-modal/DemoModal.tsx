"use client";

import React, { useEffect, useRef, useState } from "react";
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
/* canvas-confetti is deliberately NOT imported at module scope. It only ever
   runs after a successful submit, but a static import pulls it into the page's
   initial JS on every route the modal is mounted on — which is all of them. */

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "Family Medicine",
    practiceSize: "2-5 Physicians",
    notes: "",
  });

  /* Honeypot. Hidden from sight and from assistive tech, and skipped in the
     tab order, so no real user can reach it — anything that fills it is
     automated. Paired with the mount timestamp the server uses to reject
     submissions completed impossibly fast. */
  const [honeypot, setHoneypot] = useState("");

  /* Stamped in an effect rather than during render: Date.now() is impure, and
     a render-time call would also read the wrong moment under StrictMode's
     double invoke. */
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return; // guard against a double-click submitting twice

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "demo",
          ...formData,
          company: honeypot,
          startedAt: startedAt.current,
        }),
      });

      const data = await res.json().catch(() => ({ ok: false }));

      /* The success screen is shown only once the server has confirmed the
         lead. Previously this flipped unconditionally, so a visitor could be
         told "Demo Confirmed" for a request that never went anywhere. */
      if (!res.ok || !data.ok) {
        setError(
          data.error ??
            "Something went wrong sending that. Please email hello@notenra.com."
        );
        return;
      }

      setSubmitted(true);

      /* Fetched on demand. The success state renders either way — the
         celebration is decorative, so a failed chunk load must never be able
         to hold up the confirmation. */
      import("canvas-confetti")
        .then(({ default: confetti }) => {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"],
          });
        })
        .catch(() => {});
    } catch {
      setError(
        "We couldn't reach the server. Please check your connection or email hello@notenra.com."
      );
    } finally {
      setSending(false);
    }
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
          <div className="bg-[linear-gradient(135deg,#2563EB_0%,#1D4ED8_100%)] px-6 py-5 text-white flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/20 text-white text-xs font-semibold mb-1">
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
              <p className="text-base text-slate-600">
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
                {/* This is the field most likely to attract patient detail from
                    a clinician describing their workflow. This form is not a
                    BAA-covered channel, so say so before they type. */}
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Please don&apos;t include any patient information.
                </p>
              </div>

              {/* Honeypot: off-screen, untabbable, hidden from screen readers.
                  Only a bot will ever put anything in it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-0">
                <label htmlFor="demo-company-website">
                  Company website (leave blank)
                </label>
                <input
                  id="demo-company-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 px-6 rounded-lg surface-teal text-white font-semibold text-sm shadow-lg hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>
                    {sending ? "Sending…" : "Confirm Live Demo Booking"}
                  </span>
                  {!sending && (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
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
              {/* Wording is now a commitment the business actually has to
                  meet. The previous copy promised a callback "within 2 hours"
                  and named a specific assigned physician who does not exist —
                  fine while the form was a mock-up, a liability the moment real
                  leads start arriving. */}
              <h4 className="text-2xl font-bold text-brand-ink">
                Request received
              </h4>
              <p className="text-base text-slate-600 max-w-md mx-auto">
                Thank you,{" "}
                <strong className="text-brand-ink">
                  {formData.name || "Doctor"}
                </strong>
                . We have your request for{" "}
                <strong>{formData.specialty}</strong> and will reply to{" "}
                <span className="text-brand-teal">{formData.email}</span> within
                one business day.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto text-left space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-medium text-brand-ink">
                  <Calendar className="w-4 h-4 text-brand-teal" />
                  <span>Next step: we&apos;ll send scheduling options</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-brand-ink">
                  <UserCheck className="w-4 h-4 text-brand-teal" />
                  <span>You&apos;ll be matched with a clinical specialist</span>
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
