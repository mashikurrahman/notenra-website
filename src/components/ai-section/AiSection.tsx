"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const bulletPoints = [
  {
    title: "Hybrid AI + human review model",
    description:
      "Every AI output passes through a credentialed clinical reviewer before it reaches your EHR.",
  },
  {
    title: "Specialty-calibrated language models",
    description:
      "Cardiology vernacular is not internal medicine vernacular. Our models know the difference.",
  },
  {
    title: "Continuous feedback loop",
    description:
      "Physician edits and reviewer corrections improve accuracy for the entire practice network.",
  },
];

/**
 * Animated neural-network canvas — a port of the HTML reference's
 * `intelligence-canvas` (lines 1331-1376). Points drift, bounce off
 * edges, and lines are drawn between nearby points.
 */
function IntelligenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 420;
    const H = 400;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    let t = 0;
    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] =
      [];
    for (let i = 0; i < 30; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.01;

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / 100) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Nodes
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.r + Math.sin(t * 2 + p.x) * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(37,99,235,0.55)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: 420, height: 400, borderRadius: 20 }}
    />
  );
}

export function AiSection() {
  return (
    <section
      id="ai"
      className="py-10 sm:py-16 bg-white relative overflow-hidden border-b border-slate-200"
    >
      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-medium tracking-[0.2em] uppercase mb-5"
              style={{ color: "#2563EB" }}
            >
              Intelligent by Design
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold leading-[1.08] tracking-tight text-brand-ink mb-7"
            >
              NOTENRA doesn&apos;t just
              <br />
              listen. It understands.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[17px] leading-relaxed mb-10"
              style={{ color: "rgba(11,27,58,0.6)" }}
            >
              Our clinical NLP models are trained on millions of de-identified
              encounters, tuned by specialty, and continuously refined by
              feedback from credentialed reviewers. The result is documentation
              that reads like a physician wrote it — because, in a way, one did.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5"
            >
              {bulletPoints.map((bp) => (
                <div key={bp.title} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(63,164,106,0.12)" }}
                  >
                    <Check
                      className="w-3.5 h-3.5"
                      style={{ color: "#1E7A4C" }}
                    />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-brand-ink mb-1">
                      {bp.title}
                    </p>
                    <p
                      className="text-[13px]"
                      style={{ color: "rgba(11,27,58,0.55)" }}
                    >
                      {bp.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Animated intelligence visualization */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div
              className="relative"
              style={{ width: 420, height: 400 }}
            >
              <IntelligenceCanvas />

              {/* Floating glass stat cards */}
              <div
                className="absolute top-6 right-0 p-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(37,99,235,0.14)",
                  boxShadow: "0 10px 30px rgba(11,27,58,0.08)",
                }}
              >
                <p
                  className="text-[11px]"
                  style={{ color: "rgba(11,27,58,0.5)" }}
                >
                  Note accuracy
                </p>
                <p className="text-[26px] font-bold text-brand-ink">
                  98.7
                  <span className="text-sm" style={{ color: "#1E7A4C" }}>
                    %
                  </span>
                </p>
              </div>

              <div
                className="absolute bottom-8 left-0 p-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(37,99,235,0.14)",
                  boxShadow: "0 10px 30px rgba(11,27,58,0.08)",
                }}
              >
                <p
                  className="text-[11px]"
                  style={{ color: "rgba(11,27,58,0.5)" }}
                >
                  Avg. note time
                </p>
                <p className="text-[26px] font-bold text-brand-ink">
                  2.3
                  <span
                    className="text-sm"
                    style={{ color: "rgba(11,27,58,0.5)" }}
                  >
                    {" "}
                    min
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
