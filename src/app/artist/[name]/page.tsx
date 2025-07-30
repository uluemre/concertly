// src/app/artist/[name]/page.tsx
import { getArtistWithPosts } from '@/server/artist';
import { notFound } from 'next/navigation';
import { Box, Typography, Divider, Avatar } from '@mui/material';
import PostCard from '@/components/PostCard';

type Props = {
    params: { name: string };
};

export default async function ArtistPage({ params }: Props) {
    const artist = await getArtistWithPosts(decodeURIComponent(params.name));

    if (!artist) return notFound();

    return (
        <Box sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" gap={2}>
                {artist.imageUrl && (
                    <Avatar
                        src={artist.imageUrl}
                        alt={artist.name}
                        sx={{ width: 80, height: 80 }}
                    />
                )}
                <Box>
                    <Typography variant="h4">{artist.name}</Typography>
                    {artist.bio && (
                        <Typography color="text.secondary">{artist.bio}</Typography>
                    )}
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
                Gönderiler
            </Typography>

            {artist.posts.length === 0 ? (
                <Typography color="text.secondary">Bu sanatçıya ait gönderi bulunamadı.</Typography>
            ) : (
                artist.posts.map((post) => (
                    <Box key={post.id} mb={2}>
                        <PostCard
                            userName={post.user.username}
                            description={post.description}
                            imageUrl={post.imageUrl ?? undefined}
                            artistName={artist.name}
                            createdAt={post.createdAt.toISOString()}
                        />
                    </Box>
                ))
            )}
        </Box>
    );
}
