'use client';

import {
    Box,
    Typography,
    Divider,
    Avatar,
    CircularProgress,
    Link as MuiLink,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';

type Props = {
    artist: any;
};

type Event = {
    id: string;
    name: string;
    date: string;
    venue: string;
    url: string;
};

export default function ClientArtistPage({ artist }: Props) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    useEffect(() => {
        fetch(`/api/events?artist=${encodeURIComponent(artist.name)}`)
            .then((res) => res.json())
            .then(setEvents)
            .finally(() => setLoadingEvents(false));
    }, [artist.name]);

    return (
        <Box sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" gap={2}>
                {artist.imageUrl && (
                    <Avatar src={artist.imageUrl} alt={artist.name} sx={{ width: 80, height: 80 }} />
                )}
                <Box>
                    <Typography variant="h4">{artist.name}</Typography>
                    {artist.bio && <Typography color="text.secondary">{artist.bio}</Typography>}
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
                Gönderiler
            </Typography>

            {artist.posts.length === 0 ? (
                <Typography color="text.secondary">Bu sanatçıya ait gönderi bulunamadı.</Typography>
            ) : (
                artist.posts.map((post: any) => (
                    <Box key={post.id} mb={2}>
                        <PostCard
                            post={{
                                id: post.id,
                                description: post.description,
                                imageUrls: post.imageUrls,
                                createdAt: new Date(post.createdAt).toISOString(),
                                user: {
                                    id: post.user.id,
                                    username: post.user.username,
                                    profileImage: post.user.profileImage,
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

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
                Yaklaşan Konserler
            </Typography>

            {loadingEvents ? (
                <CircularProgress />
            ) : events.length === 0 ? (
                <Typography color="text.secondary">Konser bulunamadı.</Typography>
            ) : (
                events.map((event) => (
                    <Box key={event.id} mb={2}>
                        <Typography variant="subtitle1">{event.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.date} – {event.venue}
                        </Typography>
                        <MuiLink href={event.url} target="_blank" rel="noopener">
                            Bilet Al
                        </MuiLink>
                    </Box>
                ))
            )}
        </Box>
    );
}
