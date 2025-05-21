import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * ADMIN_PAGE_SIZE;

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
      take: ADMIN_PAGE_SIZE,
      include: {
        user: true,
      },
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  return Response.json({ posts, total });
}
