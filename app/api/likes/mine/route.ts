import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headerStore = await headers();
  const token = headerStore.get("Authorization")?.replace("Bearer ", "");

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

  const likes = await prisma.like.findMany({
    where: { userId: userData.user.id },
    include: {
      post: {
        include: {
          user: true,
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: { comments: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ likes });
}
