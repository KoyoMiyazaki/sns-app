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
      where: { postId },
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
  const { postId, username, content } = await req.json();

  if (!postId || !username || !content) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      username,
      content,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
