"use client";

import EmptyComponent from "@/components/empty-component";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { cn } from "@/lib/utils";
import { CommentWithMeta } from "@/types/comment";
import { ChevronDown, ChevronUp, MessageSquareReply } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Comments({ postId }: { postId: string }) {
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<CommentWithMeta[]>([]);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [openReplies, setOpenReplies] = useState<Set<string>>(new Set());

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
      const newComment = await res.json();

      setComments((prev) => [newComment, ...prev]);
      setContent("");
      toast.success("コメントしました！", {
        style: successStyle,
      });
    } else {
      toast.error("コメントできませんでした", {
        style: errorStyle,
      });
    }
  };

  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => {
      const newSet = new Set(prev);
      newSet.has(commentId) ? newSet.delete(commentId) : newSet.add(commentId);
      return newSet;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">コメント</h2>
      {/* コメント入力欄 */}
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
            <div key={comment.id}>
              <div className="relative space-y-2 border p-4 rounded-md">
                <p className="font-bold">{comment.user.username}</p>
                <p>{comment.content}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setReplyTargetId(comment.id)}
                    className="flex gap-1 items-center text-xs border rounded-md border-blue-400 p-1 text-blue-400 cursor-pointer"
                  >
                    <MessageSquareReply className="w-4 h-4" />
                    <span>返信</span>
                  </button>
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="flex gap-1 items-center text-xs border-none p-1 text-muted-foreground cursor-pointer"
                  >
                    {openReplies.has(comment.id) ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>コメントを非表示</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>コメントを見る</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              {/* 返信欄 */}
              <div className="flex flex-col items-end gap-2 mt-2">
                {openReplies.has(comment.id) &&
                  comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="w-[300px] space-y-2 border p-4 rounded-md"
                    >
                      <p className="font-bold">{reply.user.username}</p>
                      <p>{reply.content}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>

              {/* 返信入力欄 */}
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
                      const newReply = await res.json();

                      setComments((prev) =>
                        prev.map((comment) =>
                          comment.id === replyTargetId
                            ? {
                                ...comment,
                                replies: [...comment.replies, newReply],
                              }
                            : comment
                        )
                      );
                      setReplyContent("");
                      setReplyTargetId(null);
                      toast.success("返信しました！", {
                        style: successStyle,
                      });
                    } else {
                      toast.error("返信できませんでした", {
                        style: errorStyle,
                      });
                    }
                  }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <Label htmlFor="reply-content">返信内容</Label>
                  <Textarea
                    id="reply-content"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
