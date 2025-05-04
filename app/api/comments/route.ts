import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
