"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function PostForm() {
  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, content }),
    });

    if (res.ok) {
      toast.success("投稿しました！", {
        style: successStyle,
      });
      router.push("/feed");
    } else {
      toast.error("投稿しました！", {
        style: errorStyle,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-[350px] md:w-[450px]"
    >
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
      <h1 className="text-2xl font-bold">新規投稿</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
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
          投稿する
        </Button>
      </div>
    </form>
  );
}
