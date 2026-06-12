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

  // ✅ Hotlink protection for public images
  if (url.pathname.startsWith("/images/")) {
    const referer = request.headers.get("referer") || "";
    const origin = request.headers.get("origin") || "";
    const hostDomain = host.replace(/^www\./, "");
    const allowedOrigins = [
      request.nextUrl.origin,
      `https://${host}`,
      `http://${host}`,
      `https://${hostDomain}`,
      `http://${hostDomain}`,
      `https://stories.${hostDomain}`,
      `http://stories.${hostDomain}`,
    ];

    const isAllowedReferer =
      !referer || allowedOrigins.some((allowed) => referer.startsWith(allowed));
    const isAllowedOrigin = !origin || allowedOrigins.some((allowed) => origin === allowed);

    if (!isAllowedReferer && !isAllowedOrigin) {
      return new NextResponse("Hotlinking forbidden", { status: 403 });
    }
  }

  // ✅ Generate nonce (main site only)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // ✅ Detect development environment
  const isDev = process.env.NODE_ENV !== "production";

  let cspHeader: string;

  /**
   * ✅ CSP: STORIES (AMP)
   */
  if (isStories) {
    cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://cdn.ampproject.org https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://www.jamesmerriman.co.uk https://*.google-analytics.com  https://*.google.com https:;
      media-src https://www.jamesmerriman.co.uk https:;
      connect-src 'self' https://*.ampproject.org https://*.google-analytics.com  https://*.google.com https://*.githubusercontent.com;
      frame-src 'self';
      font-src 'self' https:;
      object-src 'none';
      base-uri 'self';
      frame-ancestors 'none';
    `;
  } else {
    /**
     * ✅ CSP: MAIN SITE (STRICT)
     */
    cspHeader = `
      default-src 'self';
      connect-src 'self'
        https://www.wisp.blog
        https://*.google-analytics.com
        https://*.google.com
        https://*.cloudinary.com
        https://*.doubleclick.net;

      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.youtube.com https://www.google.com;

      style-src 'self' 'unsafe-inline';

      img-src 'self' data:
        https://imagedelivery.net
        https://*.cloudinary.com
        https://*.google-analytics.com
        https://*.googletagmanager.com
        https://*.google.com
        https://*.google.co.uk;

      font-src 'self';
      frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com/;
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

  /**
   * ✅ STORIES REWRITE (with headers applied)
   */
  if (isStories) {
    const rewrittenUrl = url.clone();

    const cleanPath = url.pathname.replace(/^\/stories/, "");
    rewrittenUrl.pathname = `/stories${cleanPath}`;

    const response = NextResponse.rewrite(rewrittenUrl);

    response.headers.set("Content-Security-Policy", cspHeader);

    return applySecurityHeaders(response, true);
  }

  /**
   * ✅ MAIN SITE FLOW
   */
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);

  return applySecurityHeaders(response, false);
}

/**
 * ✅ SECURITY HEADERS
 * ✅ ✅ CORP is now domain-specific
 */
function applySecurityHeaders(response: NextResponse, isStories: boolean) {
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  /**
   * ✅ ✅ KEY FIX: Cross-origin only for stories
   */
  if (isStories) {
    response.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  } else {
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  }

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
