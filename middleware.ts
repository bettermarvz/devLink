// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // get the pathname
  const pathname = req.nextUrl.pathname;
  console.log(pathname, "1111111111111111111111pathname", req);

  // ✅ Use Supabase middleware client (reads cookies from req/res)
  const supabase = createMiddlewareClient({ req, res });

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
