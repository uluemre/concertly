// src/server/artist.ts
import prisma from '@/lib/prisma';

export async function getArtistWithPosts(name: string) {
    return await prisma.artist.findUnique({
        where: { name },
        include: {
            posts: {
                include: {
                    user: true,
                    event: true,
                    _count: { select: { likes: true, comments: true } }
                }, // post'u atan kullanıcıyı da al
                orderBy: { createdAt: 'desc' },
            },
        },
    });
}
