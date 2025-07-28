// DİKKAT: use client YOK

import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { fetchTrendingConcerts } from '@/lib/fetchConcerts';

export default async function TrendingConcerts() {
    const concerts = (await fetchTrendingConcerts()).slice(0, 4);

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Trending Concerts
            </Typography>
            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                {concerts.map((concert: any) => (
                    <Grid
                        item
                        key={concert.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2.4}
                        sx={{ display: 'flex' }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                borderRadius: 2,
                                boxShadow: 4,
                                bgcolor: 'background.paper',
                            }}
                        >
                            {concert.image && (
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={concert.image}
                                    alt={concert.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {concert.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {concert.date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {concert.venue}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
