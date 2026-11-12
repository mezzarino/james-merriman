"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { Footer } from "@/components/Footer";
import ReadingProgress from "@/components/ui/readingProgress";

function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className={[
        "page-transition",
        isReady ? "page-transition-ready" : "page-transition-entering",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function LayoutWrapper({
  children,
  isStories,
}: {
  children: React.ReactNode;
  isStories: boolean;
}) {
  return (
    <div style={isStories ? { margin: 0 } : undefined}>
      {!isStories ? (
        <>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-white text-black px-4 py-2 rounded shadow-sm"
          >
            Skip to main content
          </a>

          <ReadingProgress />

          <PageTransition>{children}</PageTransition>

          <Footer />
          <SpeedInsights />
          <Analytics />
          <ConsentBanner />
        </>
      ) : (
        children
      )}
    </div>
  );
}
