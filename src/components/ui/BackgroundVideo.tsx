"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* Ambient background video.

   The whole design of this component is about making a 289 KB asset cost
   nothing to people who never see it. The homepage transfers ~339 KB on first
   load; dropping a video into it naively would nearly double that for every
   visitor, including the ones who bounce off the hero.

   So: `preload="none"` means the browser fetches the poster and nothing else.
   The actual video source is not even attached to the <video> element until an
   IntersectionObserver says the section is approaching the viewport. Since this
   sits far down the homepage — below the hero, problem, social proof, features,
   vision, AI, specialties, bento, how-it-works and security sections — most
   visitors never pay for it at all, and nobody pays for it before LCP.

   Under prefers-reduced-motion the source is never attached and the poster
   stands in permanently. */

interface BackgroundVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Loop continuously, or play once and hold the final frame (default). */
  loop?: boolean;
}

export function BackgroundVideo({
  src,
  poster,
  className,
  loop = false,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // poster only — never fetch the video
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        io.disconnect();
      },
      /* Start the fetch a screen early so the reveal has begun by the time the
         section is actually in view, rather than popping from poster to motion
         under the reader's eyes. */
      { rootMargin: "600px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Attaching the source is what triggers the network request, so it is done
     in an effect after `shouldLoad` flips rather than via a `src` attribute
     that React would render immediately. */
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad || el.src) return;

    el.src = src;
    /* Autoplay can still be refused (data saver, low power mode, iOS Low Power
       Mode). That is a non-event: the poster is already showing the resolved
       logo, which is the frame the animation ends on anyway. */
    el.play().catch(() => {});
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
