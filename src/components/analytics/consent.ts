export type AnalyticsConsent = "granted" | "denied";

export function getStoredConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("analyticsConsent") as AnalyticsConsent | null;
}

export function setStoredConsent(value: AnalyticsConsent) {
  localStorage.setItem("analyticsConsent", value);
}
