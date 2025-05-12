import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { postId: string } }
) {
  const { postId } = context.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    if (!post) {
      return NextResponse.json(
        { message: "投稿が見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("投稿取得エラー:", error);
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}
