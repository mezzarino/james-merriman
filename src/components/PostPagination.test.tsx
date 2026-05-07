import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostPagination } from "./PostPagination";

describe("PostPagination", () => {
  it("marks the current page", () => {
    render(
      <PostPagination
        basePath="/"
        pagination={{
          page: 2,
          limit: 6,
          totalPages: 3,
          nextPage: 3,
          prevPage: 1,
        }}
      />,
    );

    expect(screen.getByRole("link", { current: "page" })).toBeInTheDocument();
  });
});
