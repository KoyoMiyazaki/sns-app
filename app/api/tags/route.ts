import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();

    return NextResponse.json(tags);
  } catch (error) {
    console.error("タグ取得失敗:", error);
    return NextResponse.json(
      { error: "タグの取得に失敗しました" },
      { status: 500 }
    );
  }
}
