"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

export default function FeedClient() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log("投稿取得エラー", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">投稿一覧</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/feed/post/${post.id}`}>
            <div className="space-y-2 border p-4 rounded-md">
              <p className="font-bold">{post.username}</p>
              <p>{post.content}</p>
              <p className="text-sm text-muted-foreground">{post.createdAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
