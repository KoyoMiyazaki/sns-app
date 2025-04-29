"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface PostClientProps {
  postId: string;
}

export default function PostClient({ postId }: PostClientProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || "投稿取得に失敗しました");
          return;
        }

        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("通信エラー:", error);
        setError("ネットワークエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <p className="text-center mt-10">読み込み中...</p>;
  }

  if (!post) {
    return <p className="text-red-500">投稿が見つかりませんでした。</p>;
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
