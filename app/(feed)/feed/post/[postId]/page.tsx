import { Metadata } from "next";
import PostClient from "./_components/post-client";

export const metadata: Metadata = {
  title: "投稿詳細",
};

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  return <PostClient postId={params.postId} />;
}
