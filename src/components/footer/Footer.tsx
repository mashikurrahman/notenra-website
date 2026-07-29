"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Solutions: [
      {
        name: "Medical Documentation",
        href: "/solutions/medical-documentation",
      },
      { name: "Coding", href: "/#coding" },
      { name: "Billing", href: "/#billing" },
      { name: "Payroll Management", href: "/#payroll" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Security & Compliance", href: "/about#security" },
      { name: "Testimonials", href: "/about#testimonials" },
      { name: "FAQ", href: "/about#faq" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Business Associate Agreement (BAA)", href: "/about#security" },
      { name: "HIPAA Statement", href: "/about#security" },
    ],
  };

  return (
    <footer className="surface-navy text-white pt-16 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-white/10 gap-6">
          <div>
            <Logo variant="light" size="lg" />
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              AI documentation, coding &amp; billing workflows, refined by
              healthcare experts.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="py-10 grid grid-cols-2 md:grid-cols-3 gap-8 border-b border-white/10">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-aqua mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} NOTENRA Medical Intelligence, Inc.
            All rights reserved.
          </div>
          <span>
            Built for Modern Independent Practices &amp; Medical Groups
          </span>
        </div>
      </div>
    </footer>
  );
}
