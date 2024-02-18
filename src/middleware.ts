import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    console.log(req.nextUrl.pathname);
    if (userAgent(req).device.type !== "mobile") {
      return NextResponse.redirect(new URL("/device-alert", req.nextUrl));
    }
  }
  if (req.nextUrl.pathname === "/device-alert") {
    if (userAgent(req).device.type === "mobile") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/", "/device-alert"],
};
