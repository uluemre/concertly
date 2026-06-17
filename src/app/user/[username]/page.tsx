import { getUserWithPostsByUsername } from '@/server/user';
import { notFound } from 'next/navigation';
import { Box, Typography, Divider } from '@mui/material';
import PostCard from '@/components/PostCard';
import { getCurrentUser } from '@/lib/auth';
import AddPostClientWrapper from '@/components/AddPostClientWrapper';

type Props = {
    params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
    const { username } = params;

    const user = await getUserWithPostsByUsername(username);
    const currentUser = await getCurrentUser();

    if (!user) return notFound();

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4">{user.username}</Typography>
            <Typography color="text.secondary">
                Katıldı: {new Date(user.createdAt).toLocaleDateString('tr-TR')}
            </Typography>


            {currentUser?.id === user.id && (
                <Box my={4}>
                    <AddPostClientWrapper />
                    <Divider sx={{ mt: 4 }} />
                </Box>
            )}

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Gönderiler
            </Typography>

            {user.posts.length === 0 ? (
                <Typography color="text.secondary">Henüz gönderi yok.</Typography>
            ) : (
                user.posts.map((post) => (
                    <Box key={post.id} mb={2}>
                        <PostCard
                            post={{
                                id: post.id,
                                description: post.description,
                                imageUrls: post.imageUrls,
                                createdAt: post.createdAt.toISOString(),
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    profileImage: user.profileImage,
                                },
                                event: post.event ? {
                                    id: post.event.id,
                                    name: post.event.name,
                                    imageUrl: post.event.imageUrl,
                                } : null,
                                _count: {
                                    likes: post._count.likes,
                                    comments: post._count.comments
                                }
                            }}
                        />
                    </Box>
                ))
            )}
        </Box>
    );
}
