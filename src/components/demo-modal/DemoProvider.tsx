"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LazyDemoModal } from "./LazyDemoModal";

/* Why this exists.

   Every page used to be `"use client"` for one reason: it held the
   `isDemoModalOpen` useState that Header/Hero/CtaSection needed. That single
   hook forced the entire page tree — including large sections that are pure
   static markup — into the client bundle.

   Moving the state into a provider inverts that. The provider is the only
   client component in the chain, so a page can be a server component and
   render its static sections as HTML, while the handful of components that
   actually open the modal reach the opener through context instead of a prop
   threaded down from the page. */

interface DemoContextValue {
  openDemo: () => void;
  closeDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

/**
 * Returns the demo-modal opener.
 *
 * Safe to call from any client component rendered under <DemoProvider>. Falls
 * back to a no-op outside a provider rather than throwing: these are marketing
 * CTAs, and a missing provider should degrade to an inert button, not a
 * white-screened page.
 */
export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  return ctx ?? NOOP_CONTEXT;
}

const NOOP_CONTEXT: DemoContextValue = {
  openDemo: () => {},
  closeDemo: () => {},
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemo = useCallback(() => setIsOpen(true), []);
  const closeDemo = useCallback(() => setIsOpen(false), []);

  /* Memoised so the context value is referentially stable. Without this every
     open/close would re-render every consumer on the page, which is the exact
     cost this refactor is meant to remove. */
  const value = useMemo(() => ({ openDemo, closeDemo }), [openDemo, closeDemo]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <LazyDemoModal isOpen={isOpen} onClose={closeDemo} />
    </DemoContext.Provider>
  );
}
