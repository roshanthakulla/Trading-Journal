import { NextResponse } from "next/server";
import { CLIENT_HOME, CLIENT_LOGIN } from "./routes/websitePanelRoute";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ["/dashboard", "/analytics", "/history"];

  //  Auth routes
  const authRoutes = ["/auth/login", "/auth/register"];

 if (
    pathname.startsWith("/auth/reset-password") ||
    pathname.startsWith("/auth/verify-otp") ||
    pathname.startsWith("/auth/update-password")
  ) {
    return NextResponse.next();
  }

  // ❌ Not logged in → protected page access
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(CLIENT_LOGIN, request.url));
  }

  // logged in →Lo login/register access block
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(CLIENT_HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/analytics",
    "/history",
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/auth/verify-otp",
    "/auth/update-password",],
};