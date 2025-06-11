import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { postId, userId } = body;

  if (!postId || !userId) {
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

  const like = await prisma.like.create({
    data: {
      postId,
      userId,
    },
  });

  if (post.userId !== userId) {
    await prisma.notification.create({
      data: {
        type: "like",
        userId: post.userId,
        postId,
        actorId: userId,
      },
    });
  }

  return NextResponse.json(like, { status: 201 });
}

export async function DELETE(req: Request) {
  const { postId, userId } = await req.json();

  if (!postId || !userId) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  await prisma.like.deleteMany({
    where: { postId, userId },
  });

  return NextResponse.json(
    { message: "いいねを解除しました" },
    { status: 200 }
  );
}
