import PostCard from "@/components/post-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase-client";
import { LikeWithPost } from "@/types/like";
import { User as SupabaseUser } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LikesCardProps {
  user: SupabaseUser;
}

export default function LikesCard({ user }: LikesCardProps) {
  const [likes, setLikes] = useState<LikeWithPost[]>([]);

  useEffect(() => {
    const fetchMyLikes = async () => {
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
          <div className="flex flex-col gap-4">
            {likes.map((like) => (
              <Link key={like.id} href={`/feed/post/${like.post.id}`}>
                <PostCard post={like.post} />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
