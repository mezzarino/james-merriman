"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FunctionComponent } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MAIN_NAV } from "@/lib/navigation";
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
  const pathname = usePathname();

  // Ensure the last breadcrumb always points to the current URL
  const updatedBreadcrumb = breadcrumb?.map((crumb, index) => {
    if (breadcrumb && index === breadcrumb.length - 1) {
      return { ...crumb, href: pathname };
    }
    return crumb;
  });

  return (
    <header
      role="banner"
      className={cn(
        "bg-gradient-to-r from-blue-900 to-gray-900 text-white pb-8 lg:pb-16 pt-4",
        className,
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Breadcrumb navigation */}
        {updatedBreadcrumb && updatedBreadcrumb.length > 0 && (
          <Breadcrumb className="mt-8 text-inherit">
            <BreadcrumbList className="text-inherit">
              {updatedBreadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="text-inherit">
                    {index === updatedBreadcrumb.length - 1 ? (
                      <BreadcrumbPage aria-current="page" className="line-clamp-1 text-inherit">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="line-clamp-1 text-inherit opacity-60"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < updatedBreadcrumb.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title */}
        <div
          className={cn(
            "prose mx-auto max-w-4xl px-4 text-center text-balance text-inherit lg:prose-lg",
            updatedBreadcrumb ? "pt-16 lg:pt-18" : "pt-16 lg:pt-28",
          )}
        >
          <h1 className="text-inherit">{title}</h1>
        </div>

        {/* Description */}
        {description && (
          <div className="mx-auto my-6 max-w-2xl text-center text-lg">{description}</div>
        )}

        {/* Primary navigation */}
        <nav
          aria-label="Primary navigation"
          className="mx-auto mt-10 max-w-3xl border-t border-white/10 pt-6 flex justify-center"
        >
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {MAIN_NAV.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
                      isActive
                        ? "text-white underline underline-offset-4"
                        : "text-white/70 hover:text-white",
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
    </header>
  );
};
