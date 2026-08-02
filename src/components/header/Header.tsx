"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useDemo } from "@/components/demo-modal/DemoProvider";
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
  /* Optional. Pages under <DemoProvider> can omit it and the header will pull
     the opener from context, which is what lets those pages stay server
     components. Kept as a prop so pages not yet migrated keep working. */
  onOpenDemo?: () => void;
}

const SIGN_IN_URL = "https://app.notenra.com/login";

const solutionsItems = [
  {
    title: "Medical Documentation",
    desc: "Ambient scribing & SOAP notes",
    href: "/solutions/medical-documentation",
    icon: FileText,
  },
  {
    title: "Medical Coding",
    desc: "Human-reviewed ICD-10 & CPT",
    href: "/solutions/medical-coding",
    icon: Cpu,
  },
  {
    title: "Medical Billing",
    desc: "Pre-claim denial prevention",
    href: "/solutions/medical-billing",
    icon: CreditCard,
  },
  {
    title: "Payroll Management",
    desc: "Revenue & compensation analytics",
    href: "/solutions/payroll-management",
    icon: BarChart3,
  },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Contact", href: "/contact" },
];

/* Hysteresis: shrink once we're clearly scrolled, only expand again near the
   very top. A single threshold makes the pill wobble on micro-scrolls. */
const SHRINK_AT = 28;
const EXPAND_AT = 8;

export function Header({ onOpenDemo }: HeaderProps) {
  const { openDemo } = useDemo();
  const handleOpenDemo = onOpenDemo ?? openDemo;

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
      className={`fixed inset-x-0 z-40 transition-all duration-500 ease-in-out ${
        isScrolled ? "top-4 px-4" : "top-0 px-4 sm:px-8"
      }`}
    >
      {/* Flat nav morphing to floating pill */}
      <div
        className={`mx-auto flex items-center justify-between border backdrop-saturate-150 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "max-w-7xl rounded-full border-slate-200/60 bg-white/90 py-2.5 px-5 shadow-lg backdrop-blur-xl"
            : "max-w-7xl rounded-[2rem] border-transparent bg-transparent py-5 px-2 shadow-none backdrop-blur-none"
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

        <nav className="hidden md:flex items-center gap-6 px-4">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
            onFocus={() => setSolutionsOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setSolutionsOpen(false);
            }}
          >
            <Link
              href="/#platform"
              aria-expanded={solutionsOpen}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ink/80 hover:text-brand-teal transition-colors py-1 cursor-pointer"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  solutionsOpen ? "rotate-180 text-brand-teal" : ""
                }`}
              />
            </Link>

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full -left-4 pt-3 z-50"
                >
                  {/* Invisible bridge to prevent closing on gap */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-transparent" />
                  <div className="w-72 bg-white rounded-2xl shadow-lg border border-slate-200 p-2">
                    {solutionsItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-brand-ink group-hover:text-brand-teal">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-brand-ink/80 hover:text-brand-teal transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={SIGN_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-ink/60 hover:text-brand-teal transition-colors duration-200 px-1"
          >
            Sign in
          </a>
          <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
          <button
            onClick={handleOpenDemo}
            className="px-5 py-2.5 rounded-full bg-brand-teal text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:bg-brand-teal-deep hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-white/80" />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <a
            href={SIGN_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-brand-ink/60 hover:text-brand-teal transition-colors px-1"
          >
            Sign in
          </a>
          <button
            onClick={handleOpenDemo}
            className="px-3.5 py-1.5 rounded-full bg-brand-teal text-white text-xs font-bold"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-brand-ink hover:bg-slate-100 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
            className={`md:hidden mx-auto mt-2 rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-md overflow-hidden transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "max-w-5xl" : "max-w-6xl"
            }`}
          >
            <div className="px-6 py-6 space-y-1">
              <nav className="flex flex-col">
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  aria-expanded={mobileSolutionsOpen}
                  className="flex items-center justify-between text-base font-bold text-brand-ink py-3 border-b border-slate-100"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
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
                            className="block text-sm font-semibold text-brand-ink/80 py-1.5"
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
                    className={`text-base font-bold text-brand-ink hover:text-brand-teal py-3 ${
                      idx < navLinks.length - 1
                        ? "border-b border-slate-100"
                        : ""
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
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-brand-ink font-semibold text-sm text-center hover:border-brand-teal hover:text-brand-teal transition-colors"
                >
                  Sign in to Dashboard
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenDemo();
                  }}
                  className="w-full py-3 rounded-xl bg-brand-teal text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>Book Your Demo</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
