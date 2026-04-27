import { NextResponse } from "next/server";

import { getIndexNowUrls } from "@/lib/getIndexNowUrls";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.INDEXNOW_DEPLOY_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const urls = await getIndexNowUrls();
  await submitToIndexNow(urls);

  return NextResponse.json({
    success: true,
    submitted: urls.length,
  });
}
