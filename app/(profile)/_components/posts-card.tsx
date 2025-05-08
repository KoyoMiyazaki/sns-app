"use client";

import PostCard from "@/components/post-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase-client";
import { Post } from "@/types/post";
import { User as SupabaseUser } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostsCardProps {
  user: SupabaseUser;
}

export default function PostsCard({ user }: PostsCardProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
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
    };

    fetchMyPosts();
  }, []);

  console.log(posts);

  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿一覧</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/feed/post/${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
