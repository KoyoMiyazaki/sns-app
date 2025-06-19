import { Metadata } from "next";
import AdminTagsClient from "./_components/admin-tags-client";

export const metadata: Metadata = {
  title: "タグ管理",
};

export default function AdminTagsPage() {
  return <AdminTagsClient />;
}
