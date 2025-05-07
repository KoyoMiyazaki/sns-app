"use client";

import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b shadow-xs flex justify-between items-center py-4 px-8 bg-white">
      <Link href={"/"} className="text-xl font-bold">
        MySNS
      </Link>
      <nav className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link href={"/signup"} className="text-sm">
              サインアップ
            </Link>
            <Link href={"/login"} className="text-sm">
              ログイン
            </Link>
          </>
        ) : (
          <>
            <Link href={"/feed"} className="text-sm">
              投稿一覧
            </Link>
            <Link href={"/profile"} className="text-sm">
              プロフィール
            </Link>
            <Button
              onClick={handleLogout}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "cursor-pointer"
              )}
            >
              ログアウト
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
