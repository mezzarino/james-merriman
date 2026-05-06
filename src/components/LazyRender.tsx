"use client";

import { useEffect, useRef, useState } from "react";

type LazyRenderProps = {
  children: React.ReactNode;
  rootMargin?: string;
  placeholder?: React.ReactNode;
};

export function LazyRender({ children, rootMargin = "250px", placeholder }: LazyRenderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} aria-live="polite">
      {isVisible ? children : (placeholder ?? null)}
    </div>
  );
}
