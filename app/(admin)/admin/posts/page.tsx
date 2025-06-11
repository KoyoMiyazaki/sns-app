import { Metadata } from "next";
import AdminPostsClient from "./_components/admin-posts-client";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "投稿一覧",
};

export default function AdminPostsPage() {
  return (
    <div>
      <Suspense>
        <AdminPostsClient />
      </Suspense>
    </div>
  );
}
