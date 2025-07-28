// src/lib/postService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: { username: true },
                },
                artist: {
                    select: { name: true },
                },
            },
        });

        return posts.map((post: any) => ({
            id: post.id,
            description: post.description,
            imageUrl: post.imageUrl,
            createdAt: post.createdAt.toISOString(),
            userName: post.user?.username || 'Unknown',
            artistName: post.artist?.name || null,
        }));

    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}
