"use client";

import EmptyComponent from "@/components/empty-component";
import NotificationSkeleton from "@/components/notification-skeleton";
import { getNotificationLabel } from "@/lib/notification-helpers";
import { supabase } from "@/lib/supabase-client";
import { NotificationWithMeta } from "@/types/notification";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<NotificationWithMeta[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const res = await fetch("/api/notifications", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("通知一覧取得エラー", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">通知一覧</h1>
      {loading ? (
        <div className="divide-y border-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyComponent objectName={"通知"} />
      ) : (
        <div className="flex flex-col divide-y border-y">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={`/feed/post/${notification.postId}`}
              className="flex items-center gap-2 px-2 py-4 hover:bg-blue-50"
            >
              {notification.read ? (
                <div className="w-3 h-3"></div>
              ) : (
                <Circle className="text-green-700 w-3 h-3" />
              )}
              <div className="flex flex-col gap-1">
                <p>
                  {notification.actor.username}があなたの投稿に
                  {getNotificationLabel(notification.type)}しました！
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
