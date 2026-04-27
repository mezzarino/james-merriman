// app/lib/indexnow.ts
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function submitToIndexNow(urls: string[]) {
  if (urls.length === 0) return;

  const payload = {
    host: new URL(process.env.NEXT_PUBLIC_BASE_URL!).host,
    key: process.env.INDEXNOW_KEY!,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("IndexNow submission failed");
  }
}
