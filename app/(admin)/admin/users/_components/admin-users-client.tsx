"use client";

import EmptyComponent from "@/components/empty-component";
import { Button, buttonVariants } from "@/components/ui/button";
import UserSkeleton from "@/components/user-skeleton";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { UserWithMeta } from "@/types/user";
import { Ban, Unlock } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminUsersClient() {
  const [users, setUsers] = useState<UserWithMeta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const res = await fetch("/api/admin/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("ユーザー一覧取得エラー", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBan = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await fetch(`/api/admin/users/${session?.user.id}/ban`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBanned: true }),
    });
  };

  const handleUnBan = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await fetch(`/api/admin/users/${session?.user.id}/ban`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBanned: false }),
    });
  };

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">ユーザー一覧</h1>
      {loading ? (
        <div className="divide-y border-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <UserSkeleton key={i} />
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyComponent objectName={"ユーザー"} />
      ) : (
        <div className="flex flex-col divide-y border-y">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-2 px-2 py-4 hover:bg-blue-50"
            >
              <div className="flex flex-col gap-1">
                <p className="font-bold">
                  {user.username}{" "}
                  <span className="font-normal">({user.email})</span>
                </p>
              </div>
              <Button
                onClick={user.isBanned ? handleUnBan : handleBan}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {user.isBanned ? (
                  <Unlock className="w-5 h-5 text-foreground" />
                ) : (
                  <Ban className="w-5 h-5 text-red-500" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
