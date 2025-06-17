"use client";

import EmptyComponent from "@/components/empty-component";
import { CommentWithMeta } from "@/types/comment";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentWithMeta[]>([]);
  const [openReplies, setOpenReplies] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">コメント一覧</h2>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
