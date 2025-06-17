"use client";

import PostCard from "@/components/post-card";
import PostSkeleton from "@/components/post-skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostWithMetaAndTags } from "@/types/post";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Comments from "./comments";
import { toast } from "sonner";
import { errorStyle } from "@/lib/toast-style";
import DeletePostButton from "./delete-post-button";

interface AdminPostClientProps {
  postId: string;
}

export default function AdminPostClient({ postId }: AdminPostClientProps) {
  const [post, setPost] = useState<PostWithMetaAndTags | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.message || "投稿取得に失敗しました", {
            style: errorStyle,
          });
          return;
        }

        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("通信エラー:", error);
        toast.error("ネットワークエラーが発生しました", {
          style: errorStyle,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <Link href={"/admin/posts"}>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投稿詳細</h1>
        <DeletePostButton postId={postId} />
      </div>
      {loading ? <PostSkeleton /> : <PostCard post={post!} />}
      <Comments postId={postId} />
    </div>
  );
}
