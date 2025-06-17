import { Metadata } from "next";
import PostClient from "./_components/admin-post-client";

export const metadata: Metadata = {
  title: "投稿詳細",
};

interface PostDetailPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  return <PostClient postId={postId} />;
}
