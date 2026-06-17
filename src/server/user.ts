// src/server/user.ts
import prisma from '@/lib/prisma';

export async function getUserWithPostsByUsername(username: string) {
    return await prisma.user.findUnique({
        where: { username },
        include: {
            posts: {
                include: {
                    artist: true,
                    venue: true,
                    event: true,
                    _count: { select: { likes: true, comments: true } },
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    });
}
