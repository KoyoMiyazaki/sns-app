"use client";

import PostCard from "@/components/post-card";
import PostSkeleton from "@/components/post-skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <Link href={"/feed"}>
        <Button
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "cursor-pointer"
          )}
        >
          <ChevronLeft />
          戻る
        </Button>
      </Link>
      <h1 className="text-2xl font-bold">投稿詳細</h1>
      {loading ? <PostSkeleton /> : <PostCard post={post!} />}
    </div>
  );
}
