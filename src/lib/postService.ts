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

export async function addPost(postData: {
    description: string;
    imageUrl?: string;
    artistName?: string;
}) {
    try {
        const user = await prisma.user.findFirst(); // geçici olarak ilk kullanıcıyı kullanıyoruz
        if (!user) throw new Error('User not found');

        let artistId;

        if (postData.artistName) {
            const artist = await prisma.artist.findFirst({
                where: { name: postData.artistName },
            });
            if (artist) artistId = artist.id;
        }

        const newPost = await prisma.post.create({
            data: {
                description: postData.description,
                imageUrl: postData.imageUrl,
                userId: user.id,
                artistId,
            },
        });

        return newPost;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
}
