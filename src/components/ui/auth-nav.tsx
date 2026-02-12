"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNav() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  // Prevent flicker while session loads
  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="hidden lg:block text-sm underline hover:opacity-70"
      >
        Login
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/about"
        className="text-sm underline hover:opacity-70"
        aria-label="Find out more about James Merriman"
      >
          About
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="hidden lg:block text-sm underline hover:opacity-70"
      >
        Sign out
      </button>
    </>
  );
}