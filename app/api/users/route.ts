import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, username } = await req.json();

  if (!id || !username) {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { id } });
  if (existing) {
    return NextResponse.json({ message: "ユーザーはすでに存在しています" });
  }

  const user = await prisma.user.create({
    data: { id, username },
  });

  return NextResponse.json(user, { status: 201 });
}
