"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/demo-modal/DemoModal";
import { ArrowRight, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col bg-white text-brand-ink selection:bg-brand-teal/20">
      <Header onOpenDemo={handleOpenDemo} />

      {/* Main 404 Section */}
      <section className="flex-1 pt-40 pb-24 flex items-center justify-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        
        <div className="page-container relative z-10 text-center max-w-xl mx-auto space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-teal">
              404 Page Not Found
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight leading-none">
              This page has left <br />
              <span className="text-brand-teal">the clinic.</span>
            </h1>
            <p className="text-base text-slate-600 font-normal leading-relaxed pt-2">
              We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or typed incorrectly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-teal text-white text-sm font-bold shadow-xs hover:bg-brand-teal-deep hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Back Home
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-brand-ink text-sm font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </main>
  );
}
