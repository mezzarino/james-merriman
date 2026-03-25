import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const constructPath = ({
  basePath,
  page,
  query,
}: {
  basePath: string;
  page?: string;
  query?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (page) searchParams.append("page", page);
  if (query) searchParams.append("query", query);
  return `${basePath}?${searchParams.toString()}`;
};

export const PostPagination = ({
  pagination,
  basePath = "/",
  query,
  numSiblingPages = 2,
  className,
}: {
  className?: string;
  basePath?: string;
  query?: string;
  numSiblingPages?: number;
  pagination: {
    page: number;
    limit: number | "all";
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}) => {
  const buildPath = (page: number) =>
    constructPath({ basePath, page: page.toString(), query });

  return (
    <Pagination className={cn("overflow-x-auto", className)}>
      <PaginationContent>
        {pagination.prevPage && (
          <PaginationItem>
            <PaginationPrevious href={buildPath(pagination.prevPage)} />
          </PaginationItem>
        )}

        {pagination.page > 3 && (
          <>
            <PaginationItem>
              <PaginationLink href={buildPath(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}

        {Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
          .filter(
            (pageNumber) =>
              Math.abs(pagination.page - pageNumber) <= numSiblingPages
          )
          .map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={buildPath(pageNumber)}
                isActive={pageNumber === pagination.page}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

        {pagination.page < pagination.totalPages - 2 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink href={buildPath(pagination.totalPages)}>
                {pagination.totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {pagination.nextPage && (
          <PaginationItem>
            <PaginationNext href={buildPath(pagination.nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

// ✅ JSON-LD helper for structured data
export const getPaginationJsonLd = ({
  pagination,
  basePath,
  query,
  numSiblingPages = 2,
}: {
  pagination: {
    page: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
  basePath: string;
  query?: string;
  numSiblingPages?: number;
}) => {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
    .filter((pageNumber) => Math.abs(pagination.page - pageNumber) <= numSiblingPages)
    .map((pageNumber, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Page ${pageNumber}`,
      item: `${basePath}?page=${pageNumber}${query ? `&query=${query}` : ""}`,
    }));

  const json: any = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pages,
    numberOfItems: pages.length,
    mainEntityOfPage: `${basePath}?page=${pagination.page}${
      query ? `&query=${query}` : ""
    }`,
  };

  if (pagination.nextPage) {
    json.nextPage = `${basePath}?page=${pagination.nextPage}${
      query ? `&query=${query}` : ""
    }`;
  }
  if (pagination.prevPage) {
    json.previousPage = `${basePath}?page=${pagination.prevPage}${
      query ? `&query=${query}` : ""
    }`;
  }

  return json;
};