"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

import { getStoredConsent } from "./consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

export function GoogleAnalyticsConsent() {
  if (getStoredConsent() !== "granted") {
    return null;
  }

  return <GoogleAnalytics gaId={GA_ID} />;
}
