import { dummyPosts } from "@/seeds/dummy_posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "投稿詳細",
};

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const post = dummyPosts.find((post) => post.id === params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">投稿詳細</h1>
      <div className="space-y-4">
        <div key={post.id} className="space-y-2 border p-4 rounded-md">
          <p className="font-bold">{post.username}</p>
          <p>{post.content}</p>
          <p className="text-sm text-muted-foreground">{post.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
