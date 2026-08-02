"use client";

import { motion } from "framer-motion";

export function UiPatientTimeline() {
  const events = [
    { time: "09:14 AM", text: "Vitals recorded", type: "neutral" },
    { time: "09:18 AM", text: "SOAP generated", type: "success" },
    { time: "09:21 AM", text: "Rx sent: Lisinopril", type: "action" },
  ];

  return (
    <div className="w-full h-full min-h-[140px] bg-slate-50 rounded-xl p-4 relative overflow-hidden border border-slate-100 flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
      
      <div className="space-y-3 relative z-10">
        {events.map((evt, i) => (
          <motion.div 
            key={i} 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${
                evt.type === 'success' ? 'bg-brand-teal' : 
                evt.type === 'action' ? 'bg-blue-500' : 'bg-slate-300'
              }`} />
              {i !== events.length - 1 && (
                <div className="w-[1.5px] h-4 bg-slate-200 mt-1" />
              )}
            </div>
            <div className="flex flex-col -mt-1">
              <span className="text-[9px] font-bold text-slate-400 tracking-wider">
                {evt.time}
              </span>
              <span className="text-xs font-semibold text-brand-ink">
                {evt.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
