export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Protect everything except:
     * - login
     * - api/auth
     * - public assets
     */
    "/((?!login|api/auth|_next|favicon.ico).*)",
  ],
};