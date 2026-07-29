"use client";

import { motion } from "framer-motion";
import { Clock, Zap, CheckCircle2, TrendingUp, Heart, Building2 } from "lucide-react";

export function SocialProof() {
  const metrics = [
    { value: "2.8 Hours", label: "Saved per physician / day", icon: Clock, color: "from-[#1B3F60] to-[#0E7C93]" },
    { value: "< 45 Seconds", label: "Documentation turnaround", icon: Zap, color: "from-[#0E7C93] to-[#4ACCCE]" },
    { value: "99.4%", label: "Coding accuracy rate", icon: CheckCircle2, color: "from-[#1B3F60] to-[#0E7C93]" },
    { value: "+38%", label: "First-pass claim yield", icon: TrendingUp, color: "from-[#0E7C93] to-[#4ACCCE]" },
    { value: "98% CSAT", label: "Physician satisfaction", icon: Heart, color: "from-[#1B3F60] to-[#F27A6B]" },
  ];

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
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B3F60] tracking-tight">
            Engineered for clinical excellence.
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Trusted by independent physicians and medical groups nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0E7C93]/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1B3F60]/5 flex items-center justify-center text-[#0E7C93] mb-4 group-hover:bg-[#0E7C93] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-3xl font-extrabold tracking-tight bg-linear-to-r ${m.color} bg-clip-text text-transparent mb-1`}>
                  {m.value}
                </div>
                <div className="text-sm font-bold text-[#1B3F60] leading-snug">
                  {m.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust strip - continuous marquee, pauses on hover */}
        <div className="pt-8 border-t border-slate-200/60">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Powering documentation for leading medical organizations
          </p>

          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex items-center gap-4 w-max animate-marquee">
              {marqueeGroups.map((group, idx) => (
                <div
                  key={`${group}-${idx}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200/60 shadow-2xs text-xs font-bold text-[#1B3F60] shrink-0"
                >
                  <Building2 className="w-4 h-4 text-[#0E7C93]" />
                  <span>{group}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
