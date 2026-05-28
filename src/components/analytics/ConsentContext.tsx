"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { GoogleAnalytics } from "./GoogleAnalytics";

export type AnalyticsConsent = "granted" | "denied";

type ConsentContextValue = {
  consent: AnalyticsConsent | null; // null = not hydrated yet
  setConsent: (value: AnalyticsConsent) => void;
  resetConsent: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<AnalyticsConsent | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("analyticsConsent") as AnalyticsConsent | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsentState((current) => (current === stored ? current : stored));
  }, []);

  function setConsent(value: AnalyticsConsent) {
    localStorage.setItem("analyticsConsent", value);
    setConsentState(value);
  }

  function resetConsent() {
    localStorage.removeItem("analyticsConsent");
    setConsentState(null); // ✅ banner will reappear
  }

  return (
    <ConsentContext.Provider value={{ consent, setConsent, resetConsent }}>
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
