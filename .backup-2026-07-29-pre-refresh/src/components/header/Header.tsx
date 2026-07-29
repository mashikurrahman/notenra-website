"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  FileText,
  Cpu,
  CreditCard,
  BarChart3,
} from "lucide-react";

interface HeaderProps {
  onOpenDemo: () => void;
}

const SIGN_IN_URL = "https://app.notenra.com/login";

const solutionsItems = [
  { title: "Medical Documentation", desc: "Ambient scribing & SOAP notes", href: "/solutions/medical-documentation", icon: FileText },
  { title: "Coding", desc: "Automated ICD-10 & CPT", href: "/#coding", icon: Cpu },
  { title: "Billing", desc: "Pre-claim denial prevention", href: "/#billing", icon: CreditCard },
  { title: "Payroll Management", desc: "Revenue & compensation analytics", href: "/#payroll", icon: BarChart3 },
];

const navLinks = [
  { name: "Specialties", href: "/about#specialties" },
  { name: "Security", href: "/about#security" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/* Hysteresis: shrink once we're clearly scrolled, only expand again near the
   very top. A single threshold makes the pill wobble on micro-scrolls. */
const SHRINK_AT = 28;
const EXPAND_AT = 8;

export function Header({ onOpenDemo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      setIsScrolled((prev) => (prev ? y > EXPAND_AT : y > SHRINK_AT));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    // Sync immediately so a reload at depth (or a #hash landing) renders correctly.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-40 px-3 sm:px-4 transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "top-2 sm:top-3" : "top-3 sm:top-4"
      }`}
    >
      {/* Floating glass pill. Only CSS transitions here — springing layout
          properties against a backdrop-filter is what made this stutter. */}
      <div
        className={`mx-auto flex items-center justify-between rounded-full border backdrop-blur-xl backdrop-saturate-150 transition-[max-width,padding,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "max-w-5xl px-4 py-2 bg-white/90 border-slate-200/90 shadow-lg shadow-[#1B3F60]/10"
            : "max-w-6xl px-6 py-3.5 bg-white/80 border-slate-200/70 shadow-md shadow-[#1B3F60]/6"
        }`}
      >
        {/* Transform-only scale keeps the logo shrink on the GPU */}
        <div
          className={`origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? "scale-[0.92]" : "scale-100"
          }`}
        >
          <Logo size="md" showTagline />
        </div>

        <nav className="hidden xl:flex items-center gap-6 px-4">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
            onFocus={() => setSolutionsOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setSolutionsOpen(false);
            }}
          >
            <Link
              href="/#platform"
              aria-expanded={solutionsOpen}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B3F60]/80 hover:text-[#0E7C93] transition-colors py-1"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180 text-[#0E7C93]" : ""}`} />
            </Link>

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full -left-4 w-72 bg-white rounded-2xl shadow-lg border border-slate-200/80 p-2 mt-3 z-50"
                >
                  {solutionsItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-[#0E7C93]/10 text-[#0E7C93] group-hover:bg-[#0E7C93] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1B3F60] group-hover:text-[#0E7C93]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-[#1B3F60]/80 hover:text-[#0E7C93] transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a
            href={SIGN_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#1B3F60]/60 hover:text-[#0E7C93] transition-colors duration-200 px-1"
          >
            Sign in
          </a>
          <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
          <button
            onClick={onOpenDemo}
            className="px-5 py-2.5 rounded-full bg-gradient-navy text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#1B3F60]/15 hover:shadow-lg hover:shadow-[#0E7C93]/25 hover:bg-[#0E7C93] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#4ACCCE]" />
          </button>
        </div>

        <div className="xl:hidden flex items-center gap-2">
          <a
            href={SIGN_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#1B3F60]/60 hover:text-[#0E7C93] transition-colors px-1"
          >
            Sign in
          </a>
          <button
            onClick={onOpenDemo}
            className="px-3.5 py-1.5 rounded-full bg-gradient-navy text-white text-xs font-bold"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#1B3F60] hover:bg-slate-100 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — matching glass panel, tracks the pill's current width */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`xl:hidden mx-auto mt-2 rounded-3xl border border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "max-w-5xl" : "max-w-6xl"
            }`}
          >
            <div className="px-6 py-6 space-y-1">
              <nav className="flex flex-col">
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  aria-expanded={mobileSolutionsOpen}
                  className="flex items-center justify-between text-base font-bold text-[#1B3F60] py-3 border-b border-slate-100"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-2 pl-3 space-y-2 border-b border-slate-100">
                        {solutionsItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm font-semibold text-[#1B3F60]/80 py-1.5"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-bold text-[#1B3F60] hover:text-[#0E7C93] py-3 ${
                      idx < navLinks.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={SIGN_IN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-[#1B3F60] font-semibold text-sm text-center hover:border-[#0E7C93] hover:text-[#0E7C93] transition-colors"
                >
                  Sign in to Dashboard
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemo();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-navy text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>Book Your Demo</span>
                  <ArrowRight className="w-4 h-4 text-[#4ACCCE]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
