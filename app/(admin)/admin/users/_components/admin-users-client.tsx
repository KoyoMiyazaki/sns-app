"use client";

import EmptyComponent from "@/components/empty-component";
import UserSkeleton from "@/components/user-skeleton";
import { supabase } from "@/lib/supabase-client";
import { UserWithMeta } from "@/types/user";
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
              className="flex items-center gap-2 px-2 py-4 hover:bg-blue-50"
            >
              <div className="flex flex-col gap-1">
                <p className="font-bold">
                  {user.username}{" "}
                  <span className="font-normal">({user.email})</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
