import { Metadata } from "next";
import FeedClient from "../_components/feed-client";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "投稿一覧",
};

export default function FeedPage() {
  return (
    <div>
      <Suspense>
        <FeedClient />
      </Suspense>
    </div>
  );
}
