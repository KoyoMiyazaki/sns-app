import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import NotificationLink from "./notification-link";

interface HeaderPCProps {
  isLoggedIn: boolean;
  notificationCount: number;
  handleLogout: () => void;
}

export default function HeaderPC({
  isLoggedIn,
  notificationCount,
  handleLogout,
}: HeaderPCProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b shadow-xs flex justify-between items-center py-4 px-8 bg-white">
      <Link href={"/"} className="text-xl font-bold">
        MySNS
      </Link>
      <nav className="flex items-center gap-4">
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
            <NotificationLink notificationCount={notificationCount} />
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
