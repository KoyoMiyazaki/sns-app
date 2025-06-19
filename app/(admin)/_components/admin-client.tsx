"use client";

import Link from "next/link";

export default function AdminClient() {
  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">管理画面</h1>
      <div className="flex flex-col divide-y border-y">
        <Link
          href={"/admin/users"}
          className="flex items-center gap-2 px-2 py-4 hover:bg-blue-50"
        >
          ユーザー管理
        </Link>
        <Link
          href={"/admin/posts"}
          className="flex items-center gap-2 px-2 py-4 hover:bg-blue-50"
        >
          投稿管理
        </Link>
        <Link
          href={"/admin/tags"}
          className="flex items-center gap-2 px-2 py-4 hover:bg-blue-50"
        >
          タグ管理
        </Link>
      </div>
    </div>
  );
}
