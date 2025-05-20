import { Metadata } from "next";
import AdminClient from "../_components/admin-client";

export const metadata: Metadata = {
  title: "管理画面",
};

export default function AdminPage() {
  return <AdminClient />;
}
