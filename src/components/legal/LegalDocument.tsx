"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, AlertTriangle, Scale } from "lucide-react";

/* Legal copy is structured data rather than raw markup so that every clause
   across both documents renders with identical type, spacing, and colour.
   Hand-written JSX per clause is how legal pages drift into five heading
   styles and three list treatments. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  intro: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: LegalSection[];
  /* Visible by default and deliberately so: this copy has not been through
     counsel. Pass false once a lawyer has signed the document off. */
  showDraftNotice?: boolean;
}

function BlockRenderer({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base sm:text-base text-slate-600 leading-relaxed font-normal">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h3 className="text-base sm:text-lg font-bold text-brand-ink pt-2">
          {block.text}
        </h3>
      );

    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm sm:text-base text-slate-600 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0 mt-2"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        /* Wide tables scroll inside their own container — the page body must
           never scroll horizontally on a phone. */
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-125 text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                {block.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-200"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100 last:border-0">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 text-xs sm:text-sm leading-relaxed align-top ${
                        i === 0
                          ? "font-bold text-brand-ink"
                          : "text-slate-600 font-normal"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout":
      return (
        <div className="bg-slate-50 border border-brand-teal-200 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 surface-teal" />
          {block.title && (
            <div className="text-xs font-extrabold uppercase tracking-widest text-brand-teal mb-2">
              {block.title}
            </div>
          )}
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            {block.text}
          </p>
        </div>
      );
  }
}

export function LegalDocument({
  eyebrow,
  title,
  intro,
  effectiveDate,
  lastUpdated,
  sections,
  showDraftNotice = false,
}: LegalDocumentProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const headingRefs = useRef<Map<string, HTMLElement>>(new Map());

  /* Scroll-spy on the contents rail. On a document this long, a reader loses
     their place quickly without it. */
  useEffect(() => {
    const elements = Array.from(headingRefs.current.values());
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      /* Top inset clears the fixed header; the large bottom inset keeps the
         highlight on the section being read rather than the next one up. */
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Header band */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-16 overflow-hidden bg-hero-grid border-b border-slate-200">
        <div className="page-container">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-8"
          >
            <Link href="/" className="hover:text-brand-teal transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-brand-ink">{title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {eyebrow}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-6xl font-extrabold text-brand-ink tracking-tight leading-[1.1]">
              {title}
            </h1>

            <p className="text-lg text-slate-600 font-normal leading-relaxed">
              {intro}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {effectiveDate && effectiveDate !== "[EFFECTIVE DATE]" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-brand-ink shadow-2xs">
                  Effective {effectiveDate}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-brand-ink shadow-2xs">
                Last updated {lastUpdated}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="page-container">
          {showDraftNotice && (
            <div className="mb-12 bg-coral-50 border border-coral-100 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-white text-coral-700 border border-coral-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-brand-ink mb-1">
                  Draft pending legal review
                </div>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  This document is a working draft prepared for internal review
                  and has not been approved by legal counsel. It is not yet a
                  binding agreement and should not be relied upon. Bracketed
                  values still require completion.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Contents rail */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <nav aria-label="Table of contents">
                <div className="text-xs font-extrabold uppercase tracking-widest text-brand-teal mb-4">
                  Contents
                </div>
                <ol className="space-y-1 border-l border-slate-200">
                  {sections.map((section, idx) => {
                    const isActive = activeId === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`block pl-4 -ml-px py-1.5 border-l-2 text-sm transition-colors ${
                            isActive
                              ? "border-brand-teal text-brand-teal font-bold"
                              : "border-transparent text-slate-600 hover:text-brand-ink font-normal"
                          }`}
                        >
                          <span className="text-slate-400 font-mono text-xs mr-2">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {section.heading}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </aside>

            {/* Clauses */}
            <div className="lg:col-span-8 space-y-14">
              {sections.map((section, idx) => (
                <article
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    if (el) headingRefs.current.set(section.id, el);
                    else headingRefs.current.delete(section.id);
                  }}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-5 pb-4 border-b border-slate-200">
                    <span className="text-brand-teal font-mono text-lg mr-3">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>

                  <div className="space-y-4">
                    {section.blocks.map((block, i) => (
                      <BlockRenderer key={i} block={block} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
