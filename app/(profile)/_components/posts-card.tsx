"use client";

import EmptyComponent from "@/components/empty-component";
import PostCard from "@/components/post-card";
import PostSkeleton from "@/components/post-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase-client";
import { PostWithMetaAndTags } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostsCard() {
  const [posts, setPosts] = useState<PostWithMetaAndTags[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const res = await fetch("/api/posts/mine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("投稿一覧取得エラー", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿一覧</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {loading ? (
            <div className="space-y">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <EmptyComponent objectName={"投稿"} />
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <Link key={post.id} href={`/feed/post/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
