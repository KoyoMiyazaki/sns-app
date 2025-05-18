import { Metadata } from "next";
import NotificationsClient from "../_components/notifications-client";

export const metadata: Metadata = {
  title: "通知一覧",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
