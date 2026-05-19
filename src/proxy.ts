import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === "/" && url.searchParams.get("page") === "1") {
    url.searchParams.delete("page");
    return NextResponse.redirect(url, 308);
  }

  // Generate a random nonce for the strict CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Define the strict CSP including the Wisp connection and nonce
  const cspHeader = `
  default-src 'self';
  connect-src 'self' https://www.wisp.blog https://*.google-analytics.com https://*.google.com https://*.cloudinary.com https://*.doubleclick.net;
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://cdn.ampproject.org;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://imagedelivery.net https://*.cloudinary.com https://*.google-analytics.com https://*.google.com https://*.google.co.uk;
  font-src 'self';
  frame-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  report-uri /api/csp-report;
  report-to csp-endpoint;
`
    .replace(/\s{2,}/g, " ")
    .trim();

  // Clone headers and append the nonce and CSP to the request
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  // Continue the request with CSP applied
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Apply security headers to the response
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  response.headers.set(
    "Report-To",
    JSON.stringify({
      group: "csp-endpoint",
      max_age: 10886400, // 18 weeks
      endpoints: [{ url: "https://www.jamesmerriman.co.uk/api/csp-report" }],
    }),
  );

  response.headers.set(
    "Reporting-Endpoints",
    "csp-endpoint='https://www.jamesmerriman.co.uk/api/csp-report'",
  );

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
