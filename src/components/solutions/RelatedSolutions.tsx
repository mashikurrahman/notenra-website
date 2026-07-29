"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Cpu, CreditCard, BarChart3, ArrowRight } from "lucide-react";

/* Single source of truth for the solution set — reused by every service page
   so adding a solution only needs an entry here.
   NOTE: only Medical Documentation has a dedicated page so far. The others
   point at their homepage sections; swap `href` to /solutions/<slug> as each
   service page ships. */
export const SOLUTIONS = [
  {
    slug: "medical-documentation",
    title: "Medical Documentation",
    blurb:
      "Ambient AI drafting with certified clinical review, delivered EHR-ready.",
    icon: FileText,
    href: "/solutions/medical-documentation",
  },
  {
    slug: "coding",
    title: "Medical Coding",
    blurb:
      "Human-reviewed ICD-10, CPT, and HCPCS assignment with compliance cross-checks.",
    icon: Cpu,
    href: "/solutions/medical-coding",
  },
  {
    slug: "billing",
    title: "Billing",
    blurb:
      "Pre-claim scrubbing that catches missing modifiers before submission.",
    icon: CreditCard,
    href: "/#billing",
  },
  {
    slug: "payroll-management",
    title: "Payroll Management",
    blurb: "RVU productivity and compensation analytics across every location.",
    icon: BarChart3,
    href: "/#payroll",
  },
] as const;

interface RelatedSolutionsProps {
  /** Slug of the page being viewed — excluded from the list */
  currentSlug: string;
  heading?: string;
  subheading?: string;
}

export function RelatedSolutions({
  currentSlug,
  heading = "Explore the rest of the platform.",
  subheading = "Documentation is one layer. These connect to the same clinical record.",
}: RelatedSolutionsProps) {
  const related = SOLUTIONS.filter((s) => s.slug !== currentSlug);

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-ink tracking-tight">
            {heading}
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link
                  href={s.href}
                  className="group relative flex flex-col h-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-brand-teal-200 hover:border-brand-teal-200 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-12 h-12 rounded-2xl surface-teal text-white flex items-center justify-center shadow-xs  group-hover:scale-110 transition-all mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-brand-ink mb-2 group-hover:text-brand-teal transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal flex-1">
                    {s.blurb}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
