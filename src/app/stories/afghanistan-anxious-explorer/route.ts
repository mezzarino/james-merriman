import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "stories",
    "afghanistan-anxious-explorer",
    "index.html",
  );

  const html = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
