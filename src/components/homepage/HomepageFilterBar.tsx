"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const FilterBar = dynamic(() => import("../FilterBar").then((m) => m.FilterBar), { ssr: false });

function FilterBarSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="my-6 h-11 w-full rounded-md bg-neutral-200 dark:bg-neutral-800"
    />
  );
}

export function HomepageFilterBar() {
  return (
    <Suspense fallback={<FilterBarSkeleton />}>
      <FilterBar active="latest" className="my-6" />
    </Suspense>
  );
}
