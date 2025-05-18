import { PAGE_SIZE } from "@/constants/pagination";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const selectedTags = searchParams.getAll("tags");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const whereClause = q
    ? {
        content: {
          contains: q,
          mode: "insensitive" as const,
        },
      }
    : selectedTags.length > 0
    ? {
        tags: {
          some: {
            tag: {
              name: { in: selectedTags },
            },
          },
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
        tags: {
          include: {
            tag: true,
          },
        },
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
  const tags: string[] = (body.tags || []).filter(
    (tag: string) => tag.trim() !== ""
  );

  if (!userId || !content) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  let post;
  if (tags.length > 0) {
    post = await prisma.post.create({
      data: {
        userId,
        content,
        imageUrl,
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
    });
  } else {
    post = await prisma.post.create({
      data: {
        userId,
        content,
        imageUrl,
      },
    });
  }

  return NextResponse.json(post, { status: 201 });
}
