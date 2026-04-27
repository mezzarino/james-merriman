import { NextResponse } from "next/server";

import { getIndexNowUrls } from "@/lib/getIndexNowUrls";
import { submitToIndexNow } from "@/lib/indexnow";

export async function GET() {
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.json({ skipped: true });
  }

  const urls = await getIndexNowUrls();
  await submitToIndexNow(urls);

  return NextResponse.json({
    success: true,
    submitted: urls.length,
  });
}
