"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "NOTENRA has completely changed my daily relationship with medicine. I used to spend 3 hours every single night finishing chart notes after putting my kids to bed. Now my notes are signed before I leave the exam room.",
      physician: "Dr. Marcus Vance, MD",
      role: "Managing Partner & Family Physician",
      practice: "Vance Family Healthcare (5 Physicians)",
      specialty: "Family Medicine",
      verified: "Verified NOTENRA Practice",
      initials: "MV",
    },
    {
      quote:
        "The combination of ambient voice AI with human reviewer auditing gives our medical group the highest confidence. Our coding accuracy increased to 99.4% and our claims denial rate dropped by over 35%.",
      physician: "Dr. Elena Rostova, MD, FACC",
      role: "Medical Director",
      practice: "Pacific Cardiovascular Associates (14 Physicians)",
      specialty: "Cardiology",
      verified: "Verified NOTENRA Practice",
      initials: "ER",
    },
    {
      quote:
        "Most scribes struggle with specialized orthopedic terminology and surgical notes. NOTENRA mastered our custom templates in less than two days. Our physicians regain over 2.5 hours every single day.",
      physician: "Dr. David Chen, MD",
      role: "Orthopedic Surgeon & Clinic Founder",
      practice: "Apex Orthopedics & Joint Institute (8 Physicians)",
      specialty: "Orthopedics",
      verified: "Verified NOTENRA Practice",
      initials: "DC",
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B3F60] tracking-tight">
            Hear from physicians who reclaimed their evenings.
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Real clinical leaders on how NOTENRA changed their documentation workflow.
          </p>
        </div>

        {/* 3 Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.physician}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C93]/40 transition-all hover:shadow-xl group"
            >
              <div>
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#0E7C93]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#0E7C93]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200 text-[11px] font-bold">
                    {t.specialty}
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic mb-8 font-normal">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-slate-200/60 flex items-center gap-4">
                {/* Clean Professional Monogram Badge (No Fake Photos) */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-navy text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-md">
                  {t.initials}
                </div>

                <div>
                  <div className="font-bold text-[#1B3F60] text-sm flex items-center gap-1.5">
                    <span>{t.physician}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C93]" />
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{t.practice}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
