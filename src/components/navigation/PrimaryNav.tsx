"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function PrimaryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const hasOpenedRef = useRef(false);

  /* ------------------------------------------------------------
   * Focus trap
   * ------------------------------------------------------------ */
  const trapFocus = useCallback((event: KeyboardEvent) => {
    if (!dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  /* ------------------------------------------------------------
   * Escape + focus trapping
   * ------------------------------------------------------------ */
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, trapFocus]);

  /* ------------------------------------------------------------
   * Focus management
   * ------------------------------------------------------------ */
  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else if (hasOpenedRef.current) {
      openButtonRef.current?.focus();
    }
  }, [open]);

  /* ------------------------------------------------------------
   * Body scroll locking
   * ------------------------------------------------------------ */
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /* ------------------------------------------------------------
   * Touch swipe to close (disabled if reduced motion)
   * ------------------------------------------------------------ */
  function handleTouchStart(e: React.TouchEvent) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      touchStartX.current === null
    )
      return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 80) setOpen(false);

    touchStartX.current = null;
  }

  return (
    <>
      {/* Desktop navigation */}
      <nav aria-label="Primary navigation" className="hidden md:flex justify-center">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile menu button */}
      <div className="flex justify-center md:hidden">
        <button
          ref={openButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="mt-4 rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60",
            "transition-opacity motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Drawer panel */}
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          aria-describedby="mobile-menu-description"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "absolute right-0 top-0 h-full w-72 bg-gray-900 text-white shadow-lg",
            "transform transition-transform duration-300 ease-out",
            "motion-reduce:transition-none motion-reduce:transform-none",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <p id="mobile-menu-description" className="sr-only">
            Primary site navigation. Press Escape or activate the Close button to dismiss this menu.
          </p>

          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <p id="mobile-menu-title" className="text-sm font-semibold">
              Navigation
            </p>
            <button
              ref={closeButtonRef}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className="text-sm text-white/70 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile primary navigation" className="p-4">
            <ul className="flex flex-col gap-4">
              {MAIN_NAV.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? undefined : -1}
                      className={cn(
                        "block text-sm font-medium transition-colors",
                        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
                        isActive
                          ? "text-white underline underline-offset-4"
                          : "text-white/80 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
