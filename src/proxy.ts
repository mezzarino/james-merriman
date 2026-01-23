import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth + login routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check NextAuth session cookie
  const sessionToken =
    request.cookies.get("__Secure-next-auth.session-token") ??
    request.cookies.get("next-auth.session-token");

  // Not logged in → redirect
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)",
  ],
};