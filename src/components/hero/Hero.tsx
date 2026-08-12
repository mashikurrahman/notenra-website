"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroCinematicVisual } from "../visuals/HeroCinematicVisual";
import { useDemo } from "@/components/demo-modal/DemoProvider";

/* Background neural network animation (matching AiSection style).

   Performance notes, because this runs on the highest-traffic page:

   - Node count is capped. The old density formula was W*H/12000, which on a
     1920x960 hero produced ~154 nodes. The connection pass is O(n^2), so that
     was ~11,800 distance checks per frame at 60fps. The cap holds the worst
     case to MAX_NODES.
   - Connections are compared by squared distance. sqrt() ran once per pair per
     frame purely to be compared against a constant.
   - The loop is suspended when the hero scrolls out of view. Previously it ran
     forever, burning a frame budget on a section nobody was looking at, for
     the entire length of the page.
   - It also suspends on tab blur, and does not start at all under
     prefers-reduced-motion (a single static frame is drawn instead). */
const MAX_NODES = 70;
const LINK_DIST = 120;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let t = 0;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }
    let nodes: Node[] = [];

    function initNodes() {
      const count = Math.min(Math.floor((W * H) / 12000), MAX_NODES);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      }));
    }

    function resize() {
      if (!canvas || !ctx) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    }

    let animId = 0;
    let running = false;

    function render(advance: boolean) {
      if (!ctx) return;

      ctx.clearRect(0, 0, W, H);
      if (advance) t += 0.01;

      if (advance) {
        for (const p of nodes) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }

      // Connections — squared-distance comparison, no sqrt in the hot loop.
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < LINK_DIST_SQ) {
            const d = Math.sqrt(dSq); // only for the ones actually drawn
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / LINK_DIST) * 0.25})`;
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = "rgba(37,99,235,0.55)";
      for (const p of nodes) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(t * 2 + p.x) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      render(true);
      animId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      animId = requestAnimationFrame(frame);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animId);
    }

    resize();

    if (reduceMotion) {
      // One static frame: the texture is kept, the motion is not.
      render(false);
    }

    /* Suspend once the hero is fully off-screen. rootMargin keeps it alive
       just past the fold so scrolling back up never reveals a frozen canvas. */
    let inView = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { rootMargin: "200px" }
    );
    io.observe(canvas);

    /* Backgrounded tabs already throttle rAF, but they do not stop it. Pausing
       explicitly means a hero left open in a background tab costs nothing. */
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 w-full h-full"
    />
  );
}


export function Hero({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const { openDemo } = useDemo();
  const handleOpenDemo = onOpenDemo ?? openDemo;

  /* There used to be a `mousePos` state here, updated on every mousemove over
     the hero and passed to HeroCanvas. HeroCanvas never read it — its effect
     had an empty dependency array — so the only thing it did was re-render the
     entire hero subtree on every pointer movement across the largest section
     of the page. Removed rather than wired up: the canvas reads better as
     ambient background than as something that chases the cursor. */

  const handleScrollToPlatform = () => {
    const target = document.getElementById("platform");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full min-h-[820px] lg:min-h-[960px]"
      style={{
        background:
          "linear-gradient(115deg, #F0F7F3 0%, #EFF5FF 42%, #E1EBFC 100%)",
      }}
    >
      {/* Background Canvas */}
      <HeroCanvas />

      {/* Main Content Area */}
      <div className="relative z-10 page-container w-full h-full flex items-center pb-[200px] sm:pb-[220px] lg:pb-[260px] pt-[120px] lg:pt-[140px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
          {/* Left: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-6"
            >
              Clinical Intelligence Platform
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold leading-[1.07] tracking-tight mb-7"
            >
              <span className="text-brand-ink">Documentation</span>
              <br />
              <span className="text-brand-ink">that moves at</span>
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-br from-brand-teal to-brand-teal-deep">
                the speed of care.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[17px] leading-relaxed mb-10 max-w-[480px]"
              style={{ color: "rgba(11,27,58,0.62)" }}
            >
              AI-powered documentation, coding and billing workflows refined by
              healthcare experts — so physicians spend less time typing and more
              time treating patients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={handleOpenDemo}
                className="group relative overflow-hidden bg-brand-teal px-8 py-4 rounded-full text-[15px] font-semibold text-white shadow-lg shadow-brand-teal/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-teal/30 active:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Demo
                </span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-brand-teal to-brand-teal-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <button
                onClick={handleScrollToPlatform}
                className="group px-8 py-4 rounded-full text-[15px] font-semibold text-brand-ink border-[1.5px] border-brand-ink/20 hover:border-brand-teal hover:text-brand-teal transition-all hover:-translate-y-[1px] flex items-center gap-2"
              >
                Explore Platform
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/70 border border-brand-teal/15 text-brand-ink/70">
                <ShieldCheck className="w-3 h-3 text-brand-teal" />
                HIPAA Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/70 border border-brand-teal/15 text-brand-ink/70">
                <Lock className="w-3 h-3 text-brand-teal" />
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/70 border border-brand-teal/15 text-brand-ink/70">
                <CheckCircle2 className="w-3 h-3 text-brand-coral" />
                BAA Available
              </span>
            </motion.div>
          </div>

          {/* Right: Cinematic Visual Overlay with Clinical Background Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center w-full"
          >
            <div className="relative w-full max-w-[540px] p-6">
              {/* Soft Clinical Background Photo Layer */}
              <div className="absolute inset-0 z-0 opacity-15 rounded-[2.5rem] overflow-hidden blur-xs pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  alt="Clinical consulting space"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#EFF5FF] to-transparent mix-blend-multiply" />
              </div>

              {/* Floating app interface visualizer */}
              <div className="relative z-10">
                <HeroCinematicVisual />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom curved fade out */}
      <div
        className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
        style={{
          height: 58,
          background: "#fff",
          left: "-7%",
          width: "114%",
          borderRadius: "50% 50% 0 0 / 30px 30px 0 0",
        }}
      >
        <div
          className="absolute top-0 left-1/4 w-2/4 h-[2px] rounded-full opacity-70"
          style={{
            background: "linear-gradient(90deg, transparent, #5C9CFF, transparent)",
          }}
        />
      </div>

      {/* Floating Clinical Impact Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute z-20 bg-white/95 border border-brand-teal/15 rounded-3xl shadow-[0_24px_70px_rgba(11,27,58,0.16)] px-6 py-6 md:px-9 md:py-7 left-1/2 -translate-x-1/2 w-[min(860px,calc(100%-48px))] bottom-[-60px] lg:bottom-[-30px]"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="md:min-w-[230px]">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-teal mb-3">
              The documentation burden
            </p>
            <div className="flex items-end gap-2">
              <span className="text-[48px] sm:text-[clamp(48px,6vw,72px)] leading-[0.9] tracking-[-0.06em] font-bold text-brand-teal">
                3.5
              </span>
              <span className="text-[18px] font-semibold text-brand-ink/50 mb-1">
                hrs
              </span>
            </div>
            <p className="text-[13px] text-brand-ink/55 mt-2">
              Daily physician charting time
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-brand-teal/10"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-7 gap-y-4 flex-1">
            <div>
              <p className="text-[20px] font-bold text-brand-ink">2–3 hrs</p>
              <p className="text-[11px] text-brand-ink/50 mt-1">
                lost to admin daily
              </p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-brand-coral">
                Near zero
              </p>
              <p className="text-[11px] text-brand-ink/50 mt-1">
                manual handoffs
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[20px] font-bold text-brand-teal">More care</p>
              <p className="text-[11px] text-brand-ink/50 mt-1">
                where it belongs
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
