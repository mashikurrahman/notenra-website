import { Building2 } from "lucide-react";

/* Stats moved to StatsFloat, which straddles the hero seam above.
   This section is now the trust strip only. */
const DataStreamBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 70%)'
    }} />
    <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent" />
    <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -translate-y-4" />
    <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/10 to-transparent transform translate-y-4" />
  </div>
);

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
    <section className="py-12 sm:py-14 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <DataStreamBackground />
      
      <div className="page-container relative z-10">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Powering documentation for leading medical organizations
        </p>

        <div
          className="relative overflow-hidden py-2"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex items-center gap-6 w-max animate-marquee">
            {marqueeGroups.map((group, idx) => (
              <div
                key={`${group}-${idx}`}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-sm text-sm font-semibold text-brand-ink/80 shrink-0 hover:bg-white transition-colors"
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
