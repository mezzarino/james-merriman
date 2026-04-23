"use client";

import Image from "next/image";
import Link from "next/link";
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
      className={cn("bg-gradient-to-r from-blue-900 to-gray-900 text-white", className)}
    >
      <div className="container mx-auto max-w-6xl px-4 pt-4 pb-8 lg:pt-6 lg:pb-12">
        {/* Breadcrumb row */}
        {updatedBreadcrumb && updatedBreadcrumb.length > 0 && (
          <div className="border-b border-white/10 pb-3">
            <Breadcrumb>
              <BreadcrumbList>
                {updatedBreadcrumb.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {index === updatedBreadcrumb.length - 1 ? (
                        <BreadcrumbPage aria-current="page" className="font-medium text-white">
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
          </div>
        )}

        {/* Logo */}
        <div className="mx-auto mt-6 mb-4 flex justify-center">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/james-merriman-travel-writer-logo.png"
              alt="James Merriman – Travel Writer logo"
              width={380}
              height={120}
              priority
              className="h-auto w-[140px] sm:w-[170px] lg:w-[200px]"
            />
          </Link>
        </div>

        {/* Title */}
        <div className="prose mx-auto max-w-4xl text-center text-inherit">
          <h1 className="text-inherit">{title}</h1>
        </div>

        {/* Description */}
        {description && (
          <div className="mx-auto mt-4 max-w-2xl text-center text-lg">{description}</div>
        )}

        {/* Primary navigation */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <PrimaryNav />
        </div>
      </div>
    </header>
  );
};
