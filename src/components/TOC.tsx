"use client";

import { parse } from "node-html-parser";
import React from "react";
import slugify from "slugify";

interface HeaderConfig {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface ProcessedContent {
  modifiedHtml: string;
  tableOfContents: TableOfContentsItem[];
}

export const processTableOfContents = (
  rawHtml: string,
  headerConfig: HeaderConfig,
): ProcessedContent => {
  const root = parse(rawHtml);
  const headers = root.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const tableOfContents: TableOfContentsItem[] = [];
  const usedIds = new Set<string>();

  headers.forEach((header) => {
    const level = parseInt(header.tagName.charAt(1));
    if (headerConfig[`h${level}` as keyof HeaderConfig]) {
      const text = header.rawText || "";
      const id = slugify(text, { lower: true, strict: true });

      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      header.setAttribute("id", uniqueId);
      tableOfContents.push({
        id: uniqueId,
        text,
        level,
      });
    }
  });

  const images = root.querySelectorAll("img");

  images.forEach((img) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") ?? "";

    if (!src) return;

    img.replaceWith(parse(`<NextImage src="${src}" alt="${alt.replace(/"/g, "&quot;")}" />`));
  });

  return {
    modifiedHtml: root.toString(),
    tableOfContents,
  };
};

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="my-2 font-medium"
            style={{ marginLeft: `${(item.level - 1) * 20}px` }}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
