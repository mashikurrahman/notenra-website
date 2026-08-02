"use client";

import React, { useState } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { LazyDemoModal } from "@/components/demo-modal/LazyDemoModal";
import { Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export function ContactClientPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    practice: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink">
      <Header onOpenDemo={handleOpenDemo} />

      <section className="pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
              Let&apos;s talk.
            </h1>
            <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              Questions about NOTENRA for your practice? Send us a note and a
              clinical workflow specialist will reply within one business day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Sarah Jenkins"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sjenkins@practice.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      placeholder="Vance Family Healthcare"
                      value={form.practice}
                      onChange={(e) =>
                        setForm({ ...form, practice: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us a bit about your practice and what you'd like to know..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-brand-teal text-white font-semibold text-sm shadow-xs hover:bg-brand-teal-deep hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-brand-teal/10 border border-brand-teal-200 rounded-full flex items-center justify-center mx-auto text-brand-teal">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-ink">
                    Message sent
                  </h3>
                  <p className="text-base text-slate-600 max-w-sm mx-auto">
                    Thanks, {form.name || "there"}. We&apos;ll reply to{" "}
                    {form.email || "your email"} within one business day.
                  </p>
                </div>
              )}
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-ink mb-1">Sales</h3>
                <p className="text-base text-brand-teal font-medium">
                  hello@notenra.com
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-ink mb-1">
                  Support
                </h3>
                <p className="text-base text-brand-teal font-medium">
                  support@notenra.com
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-ink mb-1">
                  Response Time
                </h3>
                <p className="text-base text-slate-600">
                  Within one business day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LazyDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
