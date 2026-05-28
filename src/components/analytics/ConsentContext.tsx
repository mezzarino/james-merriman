"use client";

import { createContext, useContext, useState } from "react";

import { GoogleAnalytics } from "./GoogleAnalytics";

export type AnalyticsConsent = "granted" | "denied";

type ConsentContextValue = {
  consent: AnalyticsConsent | null;
  hydrated: boolean;
  setConsent: (value: AnalyticsConsent) => void;
  resetConsent: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const hydrated = typeof window !== "undefined";

  const [consent, setConsentState] = useState<AnalyticsConsent | null>(() => {
    if (!hydrated) return null;
    return localStorage.getItem("analyticsConsent") as AnalyticsConsent | null;
  });

  function setConsent(value: AnalyticsConsent) {
    localStorage.setItem("analyticsConsent", value);
    setConsentState(value);
  }

  function resetConsent() {
    localStorage.removeItem("analyticsConsent");
    setConsentState(null);
  }

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hydrated,
        setConsent,
        resetConsent,
      }}
    >
      <GoogleAnalytics />
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
