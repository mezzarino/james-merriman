import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  // ✅ Clean pagination redirect
  if (url.pathname === "/" && url.searchParams.get("page") === "1") {
    url.searchParams.delete("page");
    return NextResponse.redirect(url, 308);
  }

  // ✅ Detect subdomain
  const host = request.headers.get("host") || "";
  const isStories = host.startsWith("stories.");

  // ✅ Generate nonce (only used for main app)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  let cspHeader: string;

  if (isStories) {
    /**
     * ✅ RELAXED CSP (AMP-compatible)
     */
    cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://cdn.ampproject.org;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://www.jamesmerriman.co.uk https:;
      connect-src 'self' https://*.ampproject.org https://*.githubusercontent.com;
      media-src https://www.jamesmerriman.co.uk https:;
      frame-src 'self';
      font-src 'self' https:;
      object-src 'none';
      base-uri 'self';
      frame-ancestors 'none';
    `;
  } else {
    /**
     * ✅ STRICT CSP (Main app)
     */
    cspHeader = `
      default-src 'self';
      connect-src 'self'
        https://www.wisp.blog
        https://*.google-analytics.com
        https://*.google.com
        https://*.cloudinary.com
        https://*.doubleclick.net
        https://*.githubusercontent.com;

      script-src 'self' 'unsafe-inline'
        https://www.googletagmanager.com;

      style-src 'self' 'unsafe-inline';

      img-src 'self' data:
        https://imagedelivery.net
        https://*.cloudinary.com
        https://*.google-analytics.com
        https://*.google.com
        https://*.google.co.uk;

      font-src 'self';
      frame-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;

      report-uri /api/csp-report;
      report-to csp-endpoint;
    `;
  }

  // ✅ Normalise CSP
  cspHeader = cspHeader.replace(/\s{2,}/g, " ").trim();

  // ✅ ✅ Rewrite BEFORE response creation

  if (isStories) {
    const rewrittenUrl = url.clone();

    // ✅ Always strip leading /stories if present
    const cleanPath = url.pathname.replace(/^\/stories/, "");

    rewrittenUrl.pathname = `/stories${cleanPath}`;

    return NextResponse.rewrite(rewrittenUrl);
  }

  // ✅ Standard request flow (main site)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);

  return applySecurityHeaders(response);
}

/**
 * ✅ Extracted security headers (cleaner + reusable)
 */
function applySecurityHeaders(response: NextResponse) {
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
      max_age: 10886400,
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
