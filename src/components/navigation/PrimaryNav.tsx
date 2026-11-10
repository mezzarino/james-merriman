"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function PrimaryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeNav = useCallback(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      setOpen(false);
      setIsClosing(false);
      return;
    }

    if (dialog.open) {
      setOpen(false);
      setIsClosing(true);

      const finishClose = () => {
        try {
          if (typeof dialog.close === "function") {
            dialog.close();
          }
        } catch {
          // ignore unsupported dialog close implementation in jsdom/test environments
        }

        dialog.removeAttribute("open");

        if ("open" in dialog && Object.getOwnPropertyDescriptor(dialog, "open")) {
          try {
            Object.defineProperty(dialog, "open", {
              value: false,
              configurable: true,
              writable: true,
            });
          } catch {
            // ignore if the DOM implementation does not allow overriding the property
          }
        }

        setIsClosing(false);
      };

      if (typeof dialog.animate === "function") {
        dialog
          .animate(
            [
              { transform: "translateX(0)", opacity: 1 },
              { transform: "translateX(100%)", opacity: 0 },
            ],
            { duration: 300, easing: "ease-out" },
          )
          .finished.then(finishClose, finishClose);
        return;
      }

      window.setTimeout(() => {
        finishClose();
      }, 300);
      return;
    }

    setOpen(false);
    setIsClosing(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "open");
      }
      setIsClosing(false);
      return;
    }

    if (!open && dialog.open && !isClosing) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [open, isClosing]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

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

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        aria-describedby="mobile-menu-description"
        onCancel={closeNav}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "m-0 h-full max-h-screen w-72 border-0 bg-gray-900 p-0 text-white shadow-lg",
          "right-0 top-0 ml-auto md:hidden motion-reduce:transition-none",
          isClosing && "closing",
        )}
      >
        <p id="mobile-menu-description" className="sr-only">
          Primary site navigation. Use the Close button or the Escape key to dismiss this menu.
        </p>

        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <p id="mobile-menu-title" className="text-sm font-semibold">
            Navigation
          </p>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeNav}
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
                    onClick={closeNav}
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
      </dialog>
    </>
  );
}
