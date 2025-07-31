'use client';

import { Box, Typography, Divider, Card, CardContent, Avatar } from '@mui/material';
import Link from 'next/link';

const popularArtists = [
    {
        name: 'Taylor Swift',
        image: '/taylor.jpeg',
    },
    {
        name: 'The Weeknd',
        image: '/the.jpeg',
    },
    {
        name: 'Billie Eilish',
        image: '/billie.jpeg',
    },
    {
        name: 'Coldplay',
        image: '/coldplay.jpeg',
    },
];

const upcomingEvents = [
    {
        title: 'Coldplay World Tour',
        date: '2025-08-15',
    },
    {
        title: 'Adele Live',
        date: '2025-09-10',
    },
    {
        title: 'Ed Sheeran Concert',
        date: '2025-09-25',
    },
];

export default function RightSidebar() {
    return (
        <Box sx={{ width: 300, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Popular Artists
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {popularArtists.map((artist, index) => (
                <Link
                    key={index}
                    href={`/artist/${encodeURIComponent(artist.name)}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <Card sx={{ display: 'flex', mb: 1, cursor: 'pointer' }}>
                        <Avatar src={artist.image} alt={artist.name} sx={{ width: 48, height: 48, m: 1 }} />
                        <CardContent sx={{ padding: '8px 16px' }}>
                            <Typography variant="body1">{artist.name}</Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Upcoming Events
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {upcomingEvents.map((event, index) => (
                <Card key={index} sx={{ mb: 1 }}>
                    <CardContent>
                        <Typography variant="body1">{event.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.date}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
