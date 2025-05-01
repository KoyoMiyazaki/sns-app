import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(posts);
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
