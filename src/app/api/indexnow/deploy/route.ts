import { NextResponse } from "next/server";

import { getIndexNowUrls } from "@/lib/getIndexNowUrls";
import { submitToIndexNow } from "@/lib/indexnow";
import { isWithinLast24Hours } from "@/lib/indexnowUtils";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.INDEXNOW_DEPLOY_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "true";

  const entries = await getIndexNowUrls();

  const urlsToSubmit = force
    ? entries.map((entry) => entry.url)
    : entries
        .filter((entry) => {
          if (!entry.lastModified) return false;

          const lastModified =
            typeof entry.lastModified === "string"
              ? new Date(entry.lastModified)
              : entry.lastModified;

          return isWithinLast24Hours(lastModified);
        })
        .map((entry) => entry.url);

  if (urlsToSubmit.length === 0) {
    return NextResponse.json({
      success: true,
      submitted: 0,
      forced: force,
      message: "No URLs matched submission criteria",
    });
  }

  await submitToIndexNow(urlsToSubmit);

  return NextResponse.json({
    success: true,
    submitted: urlsToSubmit.length,
    forced: force,
  });
}
