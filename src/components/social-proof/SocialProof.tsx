"use client";

import { Building2 } from "lucide-react";

/* Stats moved to StatsFloat, which straddles the hero seam above.
   This section is now the trust strip only. */
export function SocialProof() {
  const practiceGroups = [
    "Apex Health Partners",
    "Summit Family Medicine",
    "Vantage Cardiology Associates",
    "Pacific Dermatology Group",
    "Integrative Pediatrics Network",
    "OmniCare Internal Medicine",
  ];
  // Doubled for a seamless marquee loop
  const marqueeGroups = [...practiceGroups, ...practiceGroups];

  return (
    <section className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          Powering documentation for leading medical organizations
        </p>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex items-center gap-4 w-max animate-marquee">
            {marqueeGroups.map((group, idx) => (
              <div
                key={`${group}-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-brand-ink shrink-0"
              >
                <Building2 className="w-4 h-4 text-brand-teal" />
                <span>{group}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
