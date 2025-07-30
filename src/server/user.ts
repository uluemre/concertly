// src/server/user.ts
import prisma from '@/lib/prisma';

export async function getUserWithPostsByUsername(username: string) {
    return await prisma.user.findUnique({
        where: { username },
        include: {
            posts: {
                include: { artist: true }, // 🔥 BURASI EKLENDİ
                orderBy: { createdAt: 'desc' },
            },
        },
    });
}
