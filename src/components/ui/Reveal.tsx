"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* A one-shot scroll-into-view reveal.

   This exists to replace `motion.div` + `initial` + `whileInView`, which was
   doing exactly this and nothing more in 49 places across the site. Those
   reveals were the only reason most section components were client components
   at all, and they dragged framer-motion (~124 KB) into the initial bundle of
   every page.

   The important structural property: because this takes `children`, a *server*
   component can render <Reveal> around server-rendered markup. Only this
   ~1 KB wrapper ships to the browser; the content inside it stays HTML. That
   is what lets the sections themselves drop "use client".

   The animation is CSS (see .reveal / .reveal-in in globals.css). This file
   only decides when to add the class. */

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Which way the content travels in from. Defaults to "up". */
  direction?: Direction;
  /** Stagger, in ms. Mirrors the `delay: idx * 0.08` pattern it replaces. */
  delay?: number;
  /** Render as a different element where a <div> would be invalid markup. */
  as?: "div" | "li" | "section" | "p" | "span";
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Anything already on screen at mount — every above-the-fold section —
       skips the observer entirely and shows immediately. Waiting a frame for
       an IntersectionObserver callback there would be a visible flash. */
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect(); // one-shot, matching `viewport={{ once: true }}`
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", `reveal-${direction}`, shown && "reveal-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
