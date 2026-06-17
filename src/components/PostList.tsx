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
                    post={{
                        id: post.id,
                        description: post.description,
                        imageUrls: [],
                        createdAt: post.createdAt,
                        user: {
                            id: "unknown",
                            username: post.userName || "Unknown",
                            profileImage: null,
                        },
                        event: null,
                        _count: {
                            likes: 0,
                            comments: 0
                        }
                    }}
                />
            ))}
        </Box>
    );
}
