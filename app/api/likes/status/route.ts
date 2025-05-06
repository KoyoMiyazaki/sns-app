import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, postIds } = await req.json();

  if (!userId || !Array.isArray(postIds)) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const likes = await prisma.like.findMany({
    where: {
      userId,
      postId: { in: postIds },
    },
    select: { postId: true },
  });

  const likedPostIds = likes.map((like) => like.postId);

  return NextResponse.json(likedPostIds);
}
