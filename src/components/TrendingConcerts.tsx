"'use client';"
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { fetchTrendingConcerts } from '@/lib/fetchConcerts';

export default async function TrendingConcerts() {
    const concerts = await fetchTrendingConcerts();

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Trending Concerts
            </Typography>
            <Grid container spacing={2}>
                {concerts.map((concert: any) => (
                    <Grid item xs={12} sm={6} md={4} key={concert.id}>
                        <Card>
                            {concert.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={concert.image}
                                    alt={concert.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6">{concert.name}</Typography>
                                <Typography variant="body2">{concert.date}</Typography>
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
