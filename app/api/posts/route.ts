import { PAGE_SIZE } from "@/constants/pagination";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGE_SIZE,
    include: {
      _count: {
        select: { comments: true },
      },
    },
  });

  const total = await prisma.post.count();

  return Response.json({ posts, total });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { username, content } = body;

  if (!username || !content) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      username,
      content,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
