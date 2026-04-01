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

    // ✅ Initialize state safely by *calling the handler*, not setState directly
    handleMotionChange();

    mediaQuery.addEventListener("change", handleMotionChange);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrollPercent = (scrollTop / documentHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none">
      <div
        className={`h-full bg-neutral-900 dark:bg-neutral-100 ${
          reduceMotion ? "" : "transition-[width] duration-150 ease-out"
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
