"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { cn } from "@/lib/utils";
import { Comment } from "@/types/comment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Comments({ postId }: { postId: string }) {
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const username = userData.user?.user_metadata.username;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, username, content }),
    });

    if (res.ok) {
      toast.success("コメントしました！", {
        style: successStyle,
      });
    } else {
      toast.error("コメントできませんでした", {
        style: errorStyle,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">コメント</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="content">内容</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-60"
          />
        </div>
        <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          コメントする
        </Button>
      </form>
      <h3 className="text-lg font-bold">コメント一覧</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div className="space-y-2 border p-4 rounded-md">
            <p className="font-bold">{comment.username}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
