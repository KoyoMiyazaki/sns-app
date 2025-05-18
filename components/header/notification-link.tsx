import { Bell } from "lucide-react";
import Link from "next/link";

interface NotificationLinkProps {
  notificationCount: number;
}

export default function NotificationLink({
  notificationCount,
}: NotificationLinkProps) {
  return (
    <Link href={"/notifications"} className="relative">
      <Bell className="w-5 h-5" />
      {notificationCount > 0 && (
        <span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
          {notificationCount}
        </span>
      )}
    </Link>
  );
}
