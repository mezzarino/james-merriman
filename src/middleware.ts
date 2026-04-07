import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate a random nonce for the strict CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Define the strict CSP including the Wisp connection and nonce
  const cspHeader = `
  default-src 'self';
  connect-src 'self' https://www.wisp.blog;
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://imagedelivery.net https://assets.about.me;
  font-src 'self';
  frame-src 'none';
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

  // Return the response with the headers applied
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
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimisation files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
