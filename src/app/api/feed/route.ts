export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor"); // Last post ID for infinite scroll
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const posts = await prisma.post.findMany({
      take: limit,
      ...(cursor
        ? {
            skip: 1, // Skip the cursor itself
            cursor: { id: cursor },
          }
        : {}),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: { id: true, username: true },
        },
        event: {
          select: { id: true, name: true, imageUrl: true },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });

    const nextCursor = posts.length === limit ? posts[limit - 1].id : null;

    return NextResponse.json({
      posts,
      nextCursor,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the feed." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
