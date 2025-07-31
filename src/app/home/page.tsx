// src/app/home/page.tsx
import { Box, Grid } from '@mui/material';
import FilterSidebar from '@/components/FilterSidebar';
import RightSidebar from '@/components/RightSidebar';
import PostList from '@/components/PostList';
import TrendingConcerts from '@/components/server/TrendingConcerts';
import AddPostClientWrapper from '@/components/AddPostClientWrapper';
export default function HomePage() {
    return (
        <>

            <Box sx={{ px: 4, py: 3 }}>
                <TrendingConcerts />

                <Grid container spacing={3} mt={2}>
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
            </Box>
        </>
    );
}
