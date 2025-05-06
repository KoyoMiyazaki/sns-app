import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { postId, userId } = body;

  if (!postId || !userId) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const like = await prisma.like.create({
    data: {
      postId,
      userId,
    },
  });

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
