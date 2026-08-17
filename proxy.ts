import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { site } from "./lib/site";

const intlMiddleware = createMiddleware(routing);

const comingSoonAllowed = new Set(["/", "/en"]);

export default function proxy(request: NextRequest) {
  if (site.comingSoon) {
    const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
    if (!comingSoonAllowed.has(pathname)) {
      const target = pathname.startsWith("/en") ? "/en" : "/";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
