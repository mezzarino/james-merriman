"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

import { useConsent } from "./ConsentContext";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

export function GoogleAnalyticsConsent() {
  const { consent } = useConsent();

  if (consent !== "granted") {
    return null;
  }

  return <GoogleAnalytics gaId={GA_ID} />;
}
