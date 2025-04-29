import { Metadata } from "next";
import FeedClient from "../_components/feed-client";

export const metadata: Metadata = {
  title: "投稿一覧",
};

export default function FeedPage() {
  return <FeedClient />;
}
