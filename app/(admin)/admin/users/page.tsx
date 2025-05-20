import { Metadata } from "next";
import AdminUsersClient from "./_components/admin-users-client";

export const metadata: Metadata = {
  title: "ユーザー一覧",
};

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
