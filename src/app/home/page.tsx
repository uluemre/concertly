'use client';

import { Box, Grid } from '@mui/material';
import FilterSidebar from '@/components/FilterSidebar';
import TrendingConcerts from '@/components/TrendingConcerts';
import RightSidebar from '@/components/RightSidebar';
import PostList from '@/components/PostList';

export default function HomePage() {
    return (
        <Box sx={{ px: 4, py: 3 }}>
            <TrendingConcerts />

            <Grid container spacing={3} mt={2}>
                {/* Sol - Filtre */}
                <Grid item xs={12} md={3}>
                    <FilterSidebar />
                </Grid>

                {/* Orta - Postlar */}
                <Grid item xs={12} md={6}>
                    <PostList />
                </Grid>

                {/* Sağ - Popüler sanatçılar ve etkinlikler */}
                <Grid item xs={12} md={3}>
                    <RightSidebar />
                </Grid>
            </Grid>
        </Box>
    );
}
