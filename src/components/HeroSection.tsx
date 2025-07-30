import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <Box
            sx={{
                minHeight: '40vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'common.white',
                background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
                borderRadius: 2,
                p: 4,
                mb: 4,
            }}
        >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome to Concertly
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, maxWidth: 600 }}>
                Discover the hottest concerts and share your experiences with fellow fans.
            </Typography>
            <Button component={Link} href="/register" variant="contained" color="secondary">
                Join Now
            </Button>
        </Box>
    );
}
