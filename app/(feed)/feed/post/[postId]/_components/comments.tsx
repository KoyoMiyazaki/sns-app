"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Comments({ postId }: { postId: string }) {
  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
    </div>
  );
}
