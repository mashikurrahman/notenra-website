"use client";

import dynamic from "next/dynamic";

/* The demo modal is mounted on all 12 routes but is closed on every one of
   them until a user clicks a CTA. Statically imported it costs every visitor
   the modal tree plus its framer-motion and lucide dependencies before the
   page is even interactive.

   `ssr: false` is correct rather than merely convenient: the modal renders
   nothing until `isOpen`, so there is no markup to prerender and no layout
   that could shift when the chunk lands. */
const DemoModal = dynamic(
  () => import("./DemoModal").then((m) => m.DemoModal),
  { ssr: false }
);

interface LazyDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LazyDemoModal({ isOpen, onClose }: LazyDemoModalProps) {
  /* Gate on `isOpen` here, not inside DemoModal. next/dynamic only starts
     fetching the chunk once the component is actually rendered, so returning
     null at this level is what keeps it off the initial load. Once opened the
     chunk stays cached, so reopening is instant. */
  if (!isOpen) return null;

  return <DemoModal isOpen={isOpen} onClose={onClose} />;
}
