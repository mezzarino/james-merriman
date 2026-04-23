"use client";

import { useEffect, useRef, useState } from "react";

type LazyRenderProps = {
  children: React.ReactNode;
  /**
   * Starts loading before entering viewport.
   * 200–300px is a good editorial default.
   */
  rootMargin?: string;
  /**
   * Optional placeholder to preserve layout.
   */
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

  return <div ref={ref}>{isVisible ? children : (placeholder ?? null)}</div>;
}
