"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const FilterBar = dynamic(() => import("../FilterBar").then((m) => m.FilterBar), { ssr: false });

function FilterBarSkeleton() {
  return (
    <div className="w-full px-4 lg:px-0 my-6">
      <div
        aria-hidden="true"
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* Tabs placeholder */}
        <div className="flex gap-2 overflow-hidden py-1 pr-6 sm:pr-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-11 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
          ))}
        </div>

        {/* Search button placeholder */}
        <div className="flex justify-end sm:justify-start">
          <div className="h-10 w-10 rounded-md bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

export function HomepageFilterBar() {
  return (
    <Suspense fallback={<FilterBarSkeleton />}>
      <FilterBar active="latest" className="my-6" />
    </Suspense>
  );
}
