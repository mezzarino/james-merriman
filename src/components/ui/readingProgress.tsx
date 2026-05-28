"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = () => {
      setReduceMotion(mediaQuery.matches);
    };

    handleMotionChange();
    mediaQuery.addEventListener("change", handleMotionChange);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));

      setProgress((prev) => (Math.abs(prev - nextProgress) > 0.1 ? nextProgress : prev));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 z-50 h-0.5 w-full pointer-events-none">
      <div
        className={`
      h-full
      bg-neutral-900 dark:bg-neutral-100
      origin-left
      ${reduceMotion ? "" : "transition-transform duration-150 ease-out"}
    `}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
