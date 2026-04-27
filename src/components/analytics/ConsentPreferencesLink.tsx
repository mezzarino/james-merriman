"use client";

import { useConsent } from "@/components/analytics/ConsentContext";

export function ConsentPreferencesLink() {
  const { consent, resetConsent } = useConsent();

  // Don't show until hydration completes
  if (consent === null) return null;

  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
    >
      Analytics preferences
    </button>
  );
}
