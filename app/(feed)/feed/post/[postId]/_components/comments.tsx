"use client";

import EmptyComponent from "@/components/empty-component";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { cn } from "@/lib/utils";
import { CommentWithMeta } from "@/types/comment";
import { MessageSquareReply } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Comments({ postId }: { postId: string }) {
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<CommentWithMeta[]>([]);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        content,
        userId,
      }),
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
      <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
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
      {comments.length === 0 ? (
        <EmptyComponent objectName={"コメント"} />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <>
              <div
                key={comment.id}
                className="relative space-y-2 border p-4 rounded-md"
              >
                <p className="font-bold">{comment.user.username}</p>
                <p>{comment.content}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => setReplyTargetId(comment.id)}
                  className="absolute bottom-4 right-4 flex gap-1 items-center text-sm border rounded-md border-blue-400 px-2 py-1 text-blue-400 cursor-pointer"
                >
                  <MessageSquareReply />
                  <span>返信</span>
                </button>
              </div>
              {replyTargetId === comment.id && (
                <form
                  onSubmit={async (e: React.FormEvent) => {
                    e.preventDefault();

                    const { data: userData } = await supabase.auth.getUser();
                    const userId = userData.user?.id;

                    const res = await fetch("/api/comments", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        postId,
                        content: replyContent,
                        userId,
                        parentCommentId: comment.id,
                      }),
                    });

                    if (res.ok) {
                      toast.success("返信しました！", {
                        style: successStyle,
                      });
                    } else {
                      toast.error("返信できませんでした", {
                        style: errorStyle,
                      });
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="h-60"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => {
                        setReplyContent("");
                        setReplyTargetId(null);
                      }}
                      className={cn(
                        buttonVariants({ size: "lg", variant: "secondary" })
                      )}
                    >
                      キャンセル
                    </Button>
                    <Button
                      type="submit"
                      className={cn(buttonVariants({ size: "lg" }))}
                    >
                      返信する
                    </Button>
                  </div>
                </form>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
