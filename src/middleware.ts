// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("user_role")?.value;
  const authenticated = role ? true : false;

  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/torneios/:path*",
    "/personagens/:path*",
    "/mundial/:path*",
    "/regras/:path*",
  ],
};
