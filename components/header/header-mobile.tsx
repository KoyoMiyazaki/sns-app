"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationLink from "./notification-link";

interface HeaderMobileProps {
  isLoggedIn: boolean;
  notificationCount: number;
  handleLogout: () => void;
}

export default function HeaderMobile({
  isLoggedIn,
  notificationCount,
  handleLogout,
}: HeaderMobileProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      aria-expanded={menuOpen}
      className="flex items-center justify-between relative top-0 left-0 w-full z-50 border-b shadow-xs p-4 bg-white"
    >
      <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
        {menuOpen ? <X /> : <Menu />}
      </button>
      <NotificationLink notificationCount={notificationCount} />
      {menuOpen && (
        <nav className="absolute top-20 left-0 w-full flex flex-col gap-4 p-4 border-2 rounded-md shadow-xs z-100 bg-white">
          <Link href={"/"} className="text-md font-medium">
            ホーム
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href={"/signup"} className="text-md font-medium">
                サインアップ
              </Link>
              <Link href={"/login"} className="text-md font-medium">
                ログイン
              </Link>
            </>
          ) : (
            <>
              <Link href={"/feed"} className="text-md font-medium">
                投稿一覧
              </Link>
              <Link href={"/profile"} className="text-md font-medium">
                プロフィール
              </Link>
              <button
                onClick={handleLogout}
                className="text-md font-medium text-left cursor-pointer"
              >
                ログアウト
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
