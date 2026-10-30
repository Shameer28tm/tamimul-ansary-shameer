import { NextRequest, NextResponse } from "next/server";
import { sessionCookieName, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const valid = await verifySessionToken(request.cookies.get(sessionCookieName())?.value);
  if (!valid) {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
