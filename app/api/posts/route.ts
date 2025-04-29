import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(posts);
}
