"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { uploadImage } from "@/lib/supabase-storage";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    const splitedTags = tags.split(",");

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, content, tags: splitedTags, imageUrl }),
    });

    if (res.ok) {
      toast.success("投稿しました！", {
        style: successStyle,
      });
      router.push("/feed");
    } else {
      toast.error("投稿できませんでした", {
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
          <Label htmlFor="content">内容</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">タグ（カンマ区切り）</Label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
        <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          投稿する
        </Button>
      </div>
    </form>
  );
}
