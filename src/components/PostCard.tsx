'use client';

import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';
import Link from 'next/link';

type PostProps = {
    userName: string;
    description: string;
    imageUrl?: string;
    artistName?: string;
    venueName?: string;
    createdAt: string;
};

export default function PostCard({
    userName,
    description,
    imageUrl,
    artistName,
    venueName,
    createdAt,
}: PostProps) {
    return (
        <Card sx={{ display: 'flex', gap: 2, p: 2, mb: 3 }}>
            {imageUrl && (
                <CardMedia
                    component="img"
                    sx={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 2 }}
                    image={imageUrl}
                    alt="post image"
                />
            )}
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {userName}
                </Typography>

                {artistName && (
                    <Typography variant="body2" color="text.secondary">
                        🎤{' '}
                        <Link
                            href={`/artist/${encodeURIComponent(artistName)}`}
                            style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                            {artistName}
                        </Link>
                    </Typography>
                )}

                {venueName && (
                    <Typography variant="body2" color="text.secondary">
                        📍{' '}
                        <Link
                            href={`/venue/${encodeURIComponent(venueName)}`}
                            style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                            {venueName}
                        </Link>
                    </Typography>
                )}

                <Typography variant="body1" sx={{ mt: 1 }}>
                    {description}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }} color="text.secondary">
                    {new Date(createdAt).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
}
