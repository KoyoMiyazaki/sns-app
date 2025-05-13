import { PAGE_SIZE } from "@/constants/pagination";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const whereClause = q
    ? {
        content: {
          contains: q,
          mode: "insensitive" as const,
        },
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        user: true,
        _count: {
          select: { comments: true },
        },
      },
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  return Response.json({ posts, total });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, content, imageUrl } = body;

  if (!userId || !content) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      userId,
      content,
      imageUrl,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
