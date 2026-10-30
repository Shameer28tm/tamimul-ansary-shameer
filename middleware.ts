import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";
  if (isLoginRoute) return NextResponse.next();

  const token = request.cookies.get("portfolio_admin")?.value;
  if (!(await verifyAdminSessionToken(token))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
