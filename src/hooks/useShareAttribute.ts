import { useEffect } from "react";

export function useShareAttribution() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    const shareId = params.get("utm_content");
    const medium = params.get("utm_medium");

    if (source === "share" && campaign === "post_share" && shareId) {
      if ("gtag" in window && !sessionStorage.getItem("share_visit_tracked")) {
        sessionStorage.setItem("share_visit_tracked", "true");

        window.gtag("event", "share_visit", {
          share_id: shareId,
          platform: medium,
          page: window.location.pathname,
        });
      }
    }
  }, []);
}
