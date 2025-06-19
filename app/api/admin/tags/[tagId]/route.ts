import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ tagId: string }> }
) {
  const { tagId } = await params;
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

    await prisma.tag.delete({
      where: { id: tagId },
    });

    return NextResponse.json(
      { message: "タグを削除しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("タグ削除エラー:", error);
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}
