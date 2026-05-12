import { NextResponse } from "next/server";

export async function POST() {
  // You may safely ignore or log the body
  // const report = await req.json();

  return new NextResponse(null, {
    status: 204,
    headers: {
      "X-Robots-Tag": "noindex, nofollow, nosnippet",
      "Content-Type": "application/json",
    },
  });
}

// Explicitly block GET so crawlers cannot index
export async function GET() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "X-Robots-Tag": "noindex, nofollow, nosnippet",
    },
  });
}
