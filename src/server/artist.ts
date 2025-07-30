// src/server/artist.ts
import prisma from '@/lib/prisma';

export async function getArtistWithPosts(name: string) {
    return await prisma.artist.findUnique({
        where: { name },
        include: {
            posts: {
                include: { user: true }, // post'u atan kullanıcıyı da al
                orderBy: { createdAt: 'desc' },
            },
        },
    });
}
