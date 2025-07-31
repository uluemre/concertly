// src/components/PostList.tsx
import { Box, Typography } from '@mui/material';
import { getAllPosts } from '@/lib/postService';
import PostCard from './PostCard';

export default async function PostList() {
    const posts = await getAllPosts();

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Latest Posts
            </Typography>
            {posts.map((post: any) => (
                <PostCard
                    key={post.id}
                    userName={post.userName}
                    description={post.description}
                    imageUrl={post.imageUrl}
                    artistName={post.artistName}
                    venueName={post.venueName}
                    createdAt={post.createdAt}
                />
            ))}
        </Box>
    );
}
