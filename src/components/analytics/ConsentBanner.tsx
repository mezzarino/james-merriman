"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useConsent } from "./ConsentContext";

const emptySubscribe = () => () => {};

export function ConsentBanner() {
  const { consent, setConsent } = useConsent();

  // useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // ✅ Server and initial client render both return null safely
  if (!isMounted) return null;

  // ✅ Don’t show once a choice has been made
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-lg border bg-white p-4 shadow-sm"
    >
      <p id="cookie-consent-title" className="mb-3 text-sm text-gray-700">
        This site uses Google Analytics to understand readership. Analytics cookies are only set
        after you give explicit consent. You can update or withdraw your consent at any time as
        described in our{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setConsent("granted")}
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          Accept analytics
        </button>

        <button
          onClick={() => setConsent("denied")}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
