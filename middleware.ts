import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set(name, value, options);
        },
        remove(name, options) {
          res.cookies.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 管理画面は isAdmin=true のみ
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !session?.user?.user_metadata?.isAdmin
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ログイン必須ページ
  if (
    (req.nextUrl.pathname.startsWith("/feed") ||
      req.nextUrl.pathname.startsWith("/profile")) &&
    !session
  ) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // BANされているユーザーの場合はBAN用のページにリダイレクト
  if (session?.user.user_metadata?.isBanned) {
    const url = req.nextUrl.clone();
    url.pathname = "/banned";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/feed/:path*", "/profile/:path*", "/admin/:path*"],
};
