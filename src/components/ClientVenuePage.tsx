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
    venue: any;
};

type Event = {
    id: string;
    name: string;
    date: string;
    venue: string;
    url: string;
};

export default function ClientVenuePage({ venue }: Props) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    useEffect(() => {
        fetch(`/api/events?venue=${encodeURIComponent(venue.name)}`)
            .then((res) => res.json())
            .then(setEvents)
            .finally(() => setLoadingEvents(false));
    }, [venue.name]);

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
                venue.posts.map((post: any) => (
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
