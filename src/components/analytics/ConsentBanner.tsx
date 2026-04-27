"use client";

import { useState } from "react";

import { getStoredConsent, setStoredConsent } from "./consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(() => {
    const consent = getStoredConsent();
    return !consent;
  });

  function acceptAnalytics() {
    setStoredConsent("granted");
    setVisible(false);
    window.location.reload();
  }

  function rejectAnalytics() {
    setStoredConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-lg border bg-white p-4 shadow"
    >
      <p className="mb-3 text-sm text-gray-700">
        This site uses Google Analytics to understand readership. Analytics cookies are only used if
        you choose to accept them.
      </p>

      <div className="flex gap-3">
        <button
          onClick={acceptAnalytics}
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          Accept analytics
        </button>

        <button onClick={rejectAnalytics} className="rounded-md border px-4 py-2 text-sm">
          Reject
        </button>
      </div>
    </div>
  );
}
