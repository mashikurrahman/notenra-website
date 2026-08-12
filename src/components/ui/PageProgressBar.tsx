"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function ProgressLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setActive(true);
    setProgress(15);

    const t1 = setTimeout(() => setProgress(50), 100);
    const t2 = setTimeout(() => setProgress(85), 200);
    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setActive(false), 150);
    }, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, searchParams]);

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none h-[2.5px]">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.15 }}
        className="h-full bg-brand-teal shadow-[0_0_8px_#0E7C93]"
      />
    </div>
  );
}

export function PageProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressLoader />
    </Suspense>
  );
}
