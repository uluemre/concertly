// src/app/venue/[name]/page.tsx
import { getVenueWithPosts } from '@/server/venue';
import { notFound } from 'next/navigation';
import { Box, Typography, Divider, Avatar } from '@mui/material';
import PostCard from '@/components/PostCard';

type Props = {
    params: { name: string };
};

export default async function VenuePage({ params }: Props) {
    const venue = await getVenueWithPosts(decodeURIComponent(params.name));

    if (!venue) return notFound();

    return (
        <Box sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                {venue.imageUrl && (
                    <Avatar src={venue.imageUrl} alt={venue.name} sx={{ width: 80, height: 80 }} />
                )}
                <Box>
                    <Typography variant="h4">{venue.name}</Typography>
                    {venue.description && (
                        <Typography color="text.secondary">{venue.description}</Typography>
                    )}
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
                Gönderiler
            </Typography>

            {venue.posts.length === 0 ? (
                <Typography color="text.secondary">Bu mekana ait gönderi bulunamadı.</Typography>
            ) : (
                venue.posts.map((post) => (
                    <Box key={post.id} mb={2}>
                        <PostCard
                            userName={post.user.username}
                            description={post.description}
                            imageUrl={post.imageUrl ?? undefined}
                            artistName={post.artist?.name}
                            createdAt={post.createdAt.toISOString()}
                        />
                    </Box>
                ))
            )}
        </Box>
    );
}
