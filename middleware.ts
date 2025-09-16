// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // ✅ Use Supabase middleware client (reads cookies from req/res)
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    // redirect to dashboard if not, redirect to login
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else if (!session?.user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user &&
    (req.nextUrl.pathname.startsWith("/signup") ||
      req.nextUrl.pathname.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*", "/:username"],
};
