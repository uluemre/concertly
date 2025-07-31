// src/server/user.ts
import prisma from '@/lib/prisma';

export async function getUserWithPostsByUsername(username: string) {
    return await prisma.user.findUnique({
        where: { username },
        include: {
            posts: {
                include: {
                    artist: true,
                    venue: true, // 🔥 burada artist ve venue birlikte yazılıyor
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    });
}
