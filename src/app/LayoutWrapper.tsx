"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useMemo } from "react";

import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { GoogleAnalyticsConsent } from "@/components/analytics/GoogleAnalyticsConsent";
import { Footer } from "@/components/Footer";
import ReadingProgress from "@/components/ui/readingProgress";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const isStories = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.location.hostname.startsWith("stories.");
  }, []);

  return (
    <div style={isStories ? { margin: 0, background: "#000" } : undefined}>
      {/* ✅ ONLY render full app for main domain */}
      {!isStories ? (
        <>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-white text-black px-4 py-2 rounded shadow-sm"
          >
            Skip to main content
          </a>

          <ReadingProgress />

          {children}

          <Footer />
          <SpeedInsights />
          <Analytics />
          <ConsentBanner />
          <GoogleAnalyticsConsent />
        </>
      ) : (
        // ✅ STORIES: ONLY render content
        children
      )}
    </div>
  );
}
