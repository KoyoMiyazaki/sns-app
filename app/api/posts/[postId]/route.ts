import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const headerStore = await headers();
  const token = headerStore.get("Authorization")?.replace("Bearer ", "");

  try {
    if (!token) {
      return NextResponse.json(
        { message: "トークンがありません" },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: userData, error } = await supabase.auth.getUser(token);
    if (error || !userData?.user) {
      return NextResponse.json(
        { message: "認証に失敗しました" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, userId: true },
    });

    if (!post) {
      return NextResponse.json(
        { message: "投稿が見つかりませんでした" },
        { status: 404 }
      );
    }

    if (post.userId !== userData.user.id) {
      return NextResponse.json(
        { message: "権限がありません" },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: "投稿を削除しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("投稿削除エラー:", error);
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}
