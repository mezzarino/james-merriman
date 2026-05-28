import { useEffect } from "react";

export function useScrollTracking() {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();

    let engaged = false;
    const startTime = Date.now();

    function track(event: string, data: Record<string, unknown> = {}) {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", event, {
          page: window.location.pathname,
          ...data,
        });
      }
    }

    // ✅ Mark engagement
    const markEngaged = () => {
      engaged = true;
    };

    function onScroll() {
      markEngaged();

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      const percentage = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((t) => {
        if (percentage >= t && !fired.has(t)) {
          fired.add(t);

          track("scroll_depth", { depth: t });

          // ✅ 75% = engaged reader
          if (t === 75) {
            track("engaged_read");
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", markEngaged);

    // ✅ Low engagement (bounce-like)
    const lowEngagementTimer = setTimeout(() => {
      if (!engaged) {
        track("low_engagement");
      }
    }, 10000);

    // ✅ Time on page tracking (on leave)
    function handleUnload() {
      const seconds = Math.round((Date.now() - startTime) / 1000);

      track("time_on_page", {
        seconds,
      });
    }

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearTimeout(lowEngagementTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", markEngaged);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
}
