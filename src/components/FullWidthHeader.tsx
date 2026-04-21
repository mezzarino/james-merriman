"use client";

import { usePathname } from "next/navigation";
import React, { FunctionComponent } from "react";

import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
        {/* Breadcrumb */}
        {updatedBreadcrumb && updatedBreadcrumb.length > 0 && (
          <Breadcrumb className="mt-8 rounded-md bg-black/20 backdrop-blur px-3 py-1">
            <BreadcrumbList>
              {updatedBreadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {index === updatedBreadcrumb.length - 1 ? (
                      <BreadcrumbPage aria-current="page" className="text-white font-medium">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="text-white/80 hover:text-white focus-visible:text-white"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {index < updatedBreadcrumb.length - 1 && (
                    <BreadcrumbSeparator className="text-white/40" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title */}
        <div className="prose mx-auto max-w-4xl text-center text-inherit pt-16">
          <h1 className="text-inherit">{title}</h1>
        </div>

        {/* Description */}
        {description && (
          <div className="mx-auto my-6 max-w-2xl text-center text-lg">{description}</div>
        )}

        {/* ✅ Extracted navigation */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <PrimaryNav />
        </div>
      </div>
    </header>
  );
};
