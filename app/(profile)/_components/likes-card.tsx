import PostCard from "@/components/post-card";
import PostSkeleton from "@/components/post-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase-client";
import { LikeWithMeta } from "@/types/like";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LikesCard() {
  const [likes, setLikes] = useState<LikeWithMeta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyLikes = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const res = await fetch("/api/likes/mine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await res.json();
        setLikes(data.likes);
      } catch (error) {
        console.error("いいね一覧取得エラー", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLikes();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿一覧</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {likes.map((like) => (
                <Link key={like.id} href={`/feed/post/${like.post.id}`}>
                  <PostCard post={like.post} />
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
