"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import PostSkeleton from "@/components/post-skeleton";
import PostCard from "@/components/post-card";
import { PostWithCommentCount } from "@/types/post";
import { useSearchParams } from "next/navigation";
import PaginationControls from "@/components/pagination-controls";
import { PAGE_SIZE } from "@/constants/pagination";
import { supabase } from "@/lib/supabase-client";

export default function FeedClient() {
  const [posts, setPosts] = useState<PostWithCommentCount[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?page=${page}`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(Math.ceil(parseInt(data.total, 10) / PAGE_SIZE));

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const postIds: string[] = data.posts.map(
          (post: PostWithCommentCount) => post.id
        );
        const likeRes = await fetch("/api/likes/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, postIds }),
        });

        const likedPostIds: string[] = await likeRes.json();
        setLikedPostIds(likedPostIds);
      } catch (error) {
        console.error("投稿取得エラー", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">投稿一覧</h1>
        <Link href={"/feed/new"}>
          <Button
            className={cn(buttonVariants({ size: "sm" }), "cursor-pointer")}
          >
            <Plus />
            新規投稿
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/feed/post/${post.id}`}>
                <PostCard
                  post={post}
                  totalComments={post._count?.comments}
                  isLiked={likedPostIds.includes(post.id)}
                />
              </Link>
            ))}
          </div>
          <PaginationControls currentPage={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
