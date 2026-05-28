"use client";

import dynamic from "next/dynamic";

const FilterBar = dynamic(() => import("../FilterBar").then((m) => m.FilterBar), { ssr: false });

export function HomepageFilterBar() {
  return <FilterBar active="latest" className="my-6" />;
}
