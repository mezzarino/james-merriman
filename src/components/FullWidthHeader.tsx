"use client";

import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  label: string;
  href: string;
}

interface FullWidthHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbProps[];
  className?: string;
}

export const FullWidthHeader: FunctionComponent<FullWidthHeaderProps> = ({
  title,
  description,
  breadcrumb,
  className,
}) => {
  return (
    <>
      {/* Header */}
      <header
        role="banner"
        className={cn("bg-gradient-to-r from-blue-900 to-gray-900 text-white", className)}
      >
        <div className="container mx-auto max-w-6xl px-4 pb-8 lg:pb-10">
          {/* Logo (CLS-safe, updated for 500×295) */}
          <div className="mx-auto mb-3 flex justify-center">
            <Link href="/" aria-label="James Merriman home">
              <div className="relative w-[220px] sm:w-[260px] lg:w-[300px] aspect-[100/59]">
                <Image
                  src="/james-merriman-travel-writer-logo.png"
                  alt="James Merriman – Travel Writer logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* H1 */}
          <div className="prose mx-auto max-w-4xl text-center text-inherit">
            <h1 className="text-inherit">{title}</h1>
          </div>

          {/* Subtitle */}
          {description && (
            <div className="mx-auto mt-3 max-w-2xl text-center text-lg">{description}</div>
          )}

          {/* Primary navigation */}
          <div className="mt-8 border-t border-white/10 pt-5">
            <PrimaryNav />
          </div>
        </div>
      </header>

      {/* Breadcrumb (outside header) */}
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="container mx-auto max-w-6xl px-4 pt-4">
          <ol className="flex flex-wrap text-sm text-muted-foreground">
            {breadcrumb.map((crumb, index) => {
              const isLast = index === breadcrumb.length - 1;

              return (
                <li key={crumb.href} className="flex items-center">
                  {isLast ? (
                    <span aria-current="page" className="font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-foreground">
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast && <span className="mx-2">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};
