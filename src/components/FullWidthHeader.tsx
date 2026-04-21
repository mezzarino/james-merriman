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
  description: string;
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

  const updatedBreadcrumb = breadcrumb?.map((crumb, index) => {
    if (index === breadcrumb.length - 1) {
      return { ...crumb, href: pathname };
    }
    return crumb;
  });

  return (
    <header
      role="banner"
      className={cn(
        "pb-8 lg:pb-16 pt-4 bg-gradient-to-r from-blue-900 to-gray-900 text-white",
        className,
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* ✅ Primary navigation */}
        <nav aria-label="Primary navigation" className="mt-4 flex justify-center">
          <ul className="flex gap-6 text-sm font-medium">
            {MAIN_NAV.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-white underline" : "text-white/70 hover:text-white",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ✅ Breadcrumb navigation */}
        {updatedBreadcrumb && updatedBreadcrumb.length > 0 && (
          <Breadcrumb className="mt-8 text-inherit">
            <BreadcrumbList className="text-inherit">
              {updatedBreadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="text-inherit">
                    {index === updatedBreadcrumb.length - 1 ? (
                      <BreadcrumbPage aria-current="page" className="text-inherit line-clamp-1">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={crumb.href}
                        title={crumb.label}
                        className="text-inherit opacity-60 line-clamp-1"
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

        {/* ✅ Header title */}
        <div
          className={cn(
            "prose lg:prose-lg text-balance mx-auto text-center px-4 text-inherit max-w-4xl",
            updatedBreadcrumb ? "pt-16 lg:pt-18" : "pt-16 lg:pt-28",
          )}
        >
          <h1 className="text-inherit">{title}</h1>
        </div>

        {/* ✅ Description */}
        {description && (
          <div className="my-6 text-lg text-center max-w-2xl mx-auto">{description}</div>
        )}
      </div>
    </header>
  );
};
