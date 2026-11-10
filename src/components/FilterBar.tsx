"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { config } from "../config";
import { cn } from "../lib/utils";

/* -------------------------------------------
 * Component
 * -----------------------------------------*/
const categories = [
  { label: "Latest Writing", tag: "latest", isVisible: true },
  ...config.categories.filter((c) => c.isVisible !== false),
];

interface BlogNavigationBarProps {
  className?: string;
  active: string;
}

export const FilterBar = ({ className, active }: BlogNavigationBarProps) => {
  const params = useSearchParams();
  const router = useRouter();

  /* -------------------------------------------
   * Search state
   * -----------------------------------------*/
  const [searchText, setSearchText] = useState(params.get("query") ?? "");
  const [isSearchActive, setIsSearchActive] = useState(
    params.get("query") !== null && params.get("query") !== "",
  );

  /* -------------------------------------------
   * Refs
   * -----------------------------------------*/
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const categoryRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const setCategoryRef = useCallback(
    (tag: string) => (el: HTMLAnchorElement | null) => {
      categoryRefs.current[tag] = el;
    },
    [],
  );

  /* -------------------------------------------
   * Focus input when search opens
   * -----------------------------------------*/
  useEffect(() => {
    if (isSearchActive) {
      inputRef.current?.focus();
    }
  }, [isSearchActive]);

  /* -------------------------------------------
   * Handlers
   * -----------------------------------------*/
  const onHandleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(searchText ? `/?query=${searchText}` : "/");
    }

    if (e.key === "Escape") {
      setIsSearchActive(false);
      searchButtonRef.current?.focus();
    }
  };

  const clearSearch = () => {
    setIsSearchActive(false);
    searchButtonRef.current?.focus();

    if (!searchText && params.get("query")) {
      router.push("/");
    }
  };

  const onCategoryKeyDown = useCallback(
    (index: number) => (e: React.KeyboardEvent) => {
      const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(e.key)) return;

      e.preventDefault();

      let nextIndex = index;
      if (e.key === "ArrowRight") nextIndex += 1;
      if (e.key === "ArrowLeft") nextIndex -= 1;
      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = categories.length - 1;

      const next = categories[nextIndex];
      if (next) {
        categoryRefs.current[next.tag]?.focus();
      }
    },
    [],
  );

  /* -------------------------------------------
   * Render
   * -----------------------------------------*/
  return (
    <div className={cn("w-full px-4", className)}>
      {isSearchActive ? (
        /* SEARCH MODE */
        <div className="flex items-center gap-2 rounded-md border px-3 py-2">
          <label htmlFor="search" className="sr-only">
            Search posts
          </label>
          <input
            id="search"
            ref={inputRef}
            type="text"
            placeholder="Search posts…"
            className="w-full bg-transparent text-sm focus:outline-hidden"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={onHandleKey}
          />
          <button onClick={clearSearch} aria-label="Clear search" className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        /* NORMAL MODE */
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* CATEGORY TABS */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-linear-to-r from-white to-transparent sm:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-linear-to-l from-white to-transparent sm:hidden" />

            <div
              role="tablist"
              aria-label="Blog categories"
              className="
                flex gap-2 overflow-x-auto py-1 pr-6
                whitespace-nowrap snap-x snap-mandatory
                [-ms-overflow-style:none]
                scrollbar-none
                [&::-webkit-scrollbar]:hidden
                sm:overflow-visible sm:pr-0
              "
            >
              {categories.map((category, index) => {
                const isActive = active === category.tag;
                const href = category.tag === "latest" ? "/" : `/category/${category.tag}`;

                return (
                  <Link
                    key={category.tag}
                    href={href}
                    ref={setCategoryRef(category.tag)}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={onCategoryKeyDown(index)}
                    className="snap-start focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <span
                      className={cn(
                        "inline-flex min-h-11 items-center rounded border px-4 text-sm transition",
                        isActive ? "bg-black text-white" : "bg-gray-200 text-black",
                        "sm:px-3 sm:py-2",
                      )}
                    >
                      {category.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="flex justify-end sm:justify-start">
            <button
              ref={searchButtonRef}
              onClick={() => setIsSearchActive(true)}
              aria-label="Search posts"
              className="rounded-md p-2 hover:bg-gray-100"
            >
              <Search aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
