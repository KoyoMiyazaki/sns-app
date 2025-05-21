import { Metadata } from "next";
import AdminPostsClient from "./_components/admin-posts-client";

export const metadata: Metadata = {
  title: "投稿一覧",
};

export default function AdminPostsPage() {
  return <AdminPostsClient />;
}
