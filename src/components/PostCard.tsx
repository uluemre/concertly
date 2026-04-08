"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface User {
  id: string;
  username: string;
  profileImage?: string | null;
}

interface Event {
  id: string;
  name: string;
  imageUrl?: string | null;
}

interface Count {
  likes: number;
  comments: number;
}

interface Post {
  id: string;
  description?: string | null;
  imageUrls: string[];
  createdAt: string;
  user: User;
  event?: Event | null;
  _count: Count;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card sx={{ maxWidth: 600, mb: 3, mx: "auto", bgcolor: "background.paper" }}>
      <CardHeader
        avatar={
          <Avatar
            src={post.user.profileImage || ""}
            alt={post.user.username}
          >
            {post.user.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={post.user.username}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      {post.imageUrls && post.imageUrls.length > 0 && (
        <img
          src={post.imageUrls[0]}
          alt="Post image"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      )}
      <CardContent>
        {post.event && (
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Event: {post.event.name}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          {post._count?.likes || 0}
        </Typography>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {post._count?.comments || 0}
        </Typography>
      </CardActions>
    </Card>
  );
}
