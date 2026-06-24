import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth"; 

type AuthRequest = NextRequest & { auth?: any };

export const proxy = auth((req:AuthRequest) => {
  const isLoggedIn = !!req.auth;
  const currentUrl = req.nextUrl.pathname;

  console.log("Auth", req.auth);

  if ((currentUrl.startsWith("/dashboard") || currentUrl.startsWith("/api/dashboard")) && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/dashboard/:path*'
  ],
};