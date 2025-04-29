import { dummyPosts } from "@/seeds/dummy_posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "投稿一覧",
};

export default function FeedPage() {
  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">投稿一覧</h1>
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <div key={post.id} className="space-y-2 border p-4 rounded-md">
            <p className="font-bold">{post.username}</p>
            <p>{post.content}</p>
            <p className="text-sm text-muted-foreground">{post.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
