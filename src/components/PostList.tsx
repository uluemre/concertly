import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { getAllPosts } from '@/lib/postService';

export default async function PostList() {
    const posts = await getAllPosts();

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Latest Posts
            </Typography>
            <Grid container spacing={3}>
                {posts.map((post: any) => (
                    <Grid item key={post.id} xs={12}>
                        <Card sx={{ display: 'flex', gap: 2, p: 2 }}>
                            {post.imageUrl && (
                                <CardMedia
                                    component="img"
                                    sx={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 2 }}
                                    image={post.imageUrl}
                                    alt="post image"
                                />
                            )}
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {post.userName}
                                </Typography>
                                {post.artistName && (
                                    <Typography variant="body2" color="text.secondary">
                                        🎤 {post.artistName}
                                    </Typography>
                                )}
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {post.description}
                                </Typography>
                                <Typography variant="caption" sx={{ mt: 1, display: 'block' }} color="text.secondary">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
