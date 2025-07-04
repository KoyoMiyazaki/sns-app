"use client";

import PostCard from "@/components/post-card";
import PostSkeleton from "@/components/post-skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostWithMetaAndTags } from "@/types/post";
import { ChevronLeft, Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Comments from "./comments";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toast-style";
import DeletePostButton from "./delete-post-button";

interface PostClientProps {
  postId: string;
}

export default function PostClient({ postId }: PostClientProps) {
  const [post, setPost] = useState<PostWithMetaAndTags | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

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

    const fetchLikeStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch("/api/likes/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, postIds: [postId] }),
      });

      const likedPostIds: string[] = await res.json();
      setIsLiked(likedPostIds.includes(postId));
    };

    fetchUser();
    fetchPost();
    fetchLikeStatus();
  }, [postId]);

  const handleLikeToggle = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastPrefixText = isLiked ? "いいね解除" : "いいね";
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error(`${toastPrefixText}できませんでした`, {
        style: errorStyle,
      });
      return;
    }

    let res;
    if (isLiked) {
      // いいね解除処理
      res = await fetch("/api/likes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId: user.id }),
      });
    } else {
      // いいね処理
      res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId: user.id }),
      });
    }

    if (!res.ok) {
      toast.error(`${toastPrefixText}できませんでした`, {
        style: errorStyle,
      });
      return;
    }

    setIsLiked(!isLiked);

    toast.success(`${toastPrefixText}しました！`, {
      style: successStyle,
    });
  };

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">投稿詳細</h1>
        {post?.userId === userId && <DeletePostButton postId={postId} />}
      </div>
      {loading ? <PostSkeleton /> : <PostCard post={post!} />}
      <Button
        onClick={handleLikeToggle}
        className={cn(
          buttonVariants({ variant: "outline" }),
          isLiked ? "text-accent-foreground" : "text-muted-foreground"
        )}
      >
        <Heart
          className={cn(
            isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
          )}
        />
        <span>{isLiked ? "いいね済み" : "いいね！"}</span>
      </Button>
      <Comments postId={postId} />
    </div>
  );
}
