"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PostSkeleton from "@/components/post-skeleton";
import PostCard from "./post-card";
import { PostWithMetaAndTags } from "@/types/post";
import { useSearchParams } from "next/navigation";
import PaginationControls from "@/components/pagination-controls";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { supabase } from "@/lib/supabase-client";
import { Input } from "@/components/ui/input";
import EmptyComponent from "@/components/empty-component";

export default function AdminPostsClient() {
  const [posts, setPosts] = useState<PostWithMetaAndTags[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const q = searchParams.get("q") || "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/admin/posts?page=${page}&q=${q}`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(Math.ceil(parseInt(data.total, 10) / ADMIN_PAGE_SIZE));

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const postIds: string[] = data.posts.map(
          (post: PostWithMetaAndTags) => post.id
        );
        await fetch("/api/likes/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, postIds }),
        });
      } catch (error) {
        console.error("投稿取得エラー", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, q]);

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[700px]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">投稿一覧</h1>
      </div>
      <div className="space-y-4">
        <form method="GET">
          <Input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="投稿を検索"
          />
        </form>
      </div>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyComponent objectName={"投稿"} />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/admin/posts/${post.id}`}>
                <PostCard post={post} totalComments={post._count?.comments} />
              </Link>
            ))}
          </div>
          <PaginationControls currentPage={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
