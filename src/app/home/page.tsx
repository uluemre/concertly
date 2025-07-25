'use client';

import { Box, Container, Grid } from '@mui/material';
import Navbar from '@/components/Navbar';
import TrendingConcerts from '@/components/TrendingConcerts';
import PostList from '@/components/PostList';
import FilterSidebar from '@/components/FilterSidebar';
import RightSidebar from '@/components/RightSidebar';

export default function HomePage() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />
            <TrendingConcerts />
            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <FilterSidebar />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PostList />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RightSidebar />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
