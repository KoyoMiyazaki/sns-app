import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "postIdは必要です" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentCommentId: null,
      },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("コメント取得失敗:", error);
    return NextResponse.json(
      { error: "コメントの取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { postId, userId, content, parentCommentId } = await req.json();

  if (!postId || !userId || !content) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { userId: true },
  });

  if (!post) {
    return NextResponse.json(
      { message: "投稿が存在しません" },
      { status: 404 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      userId,
      content,
      parentCommentId: parentCommentId ?? null,
    },
  });

  if (post.userId !== userId) {
    await prisma.notification.create({
      data: {
        type: "comment",
        userId: post.userId,
        postId,
        actorId: userId,
      },
    });
  }

  return NextResponse.json(comment, { status: 201 });
}
