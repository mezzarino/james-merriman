"use client";

import { createContext, useContext, useState } from "react";

export type AnalyticsConsent = "granted" | "denied" | "unknown";

type ConsentContextValue = {
  consent: AnalyticsConsent;
  setConsent: (value: AnalyticsConsent) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<AnalyticsConsent>(() => {
    if (typeof window === "undefined") {
      return "unknown";
    }
    return (localStorage.getItem("analyticsConsent") as AnalyticsConsent) ?? "unknown";
  });

  function setConsent(value: AnalyticsConsent) {
    localStorage.setItem("analyticsConsent", value);
    setConsentState(value);
  }

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
