"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PostForm() {
  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleClick = () => {};

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[450px]">
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
        <Button
          onClick={handleClick}
          className={cn(buttonVariants({ size: "lg" }))}
        >
          投稿する
        </Button>
      </div>
    </div>
  );
}
