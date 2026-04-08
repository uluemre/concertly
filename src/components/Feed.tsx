"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import PostCard from "./PostCard";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const url = new URL("/api/feed", window.location.origin);
      url.searchParams.append("limit", "5");
      if (nextCursor) {
        url.searchParams.append("cursor", nextCursor);
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch feed");

      const data = await res.json();

      setPosts((prevPosts) => {
        const newPosts = data.posts.filter(
          (newPost: any) => !prevPosts.some((prev) => prev.id === newPost.id)
        );
        return [...prevPosts, ...newPosts];
      });

      setNextCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {posts.length === 0 && !loading && (
        <Typography variant="body1" align="center" color="text.secondary">
          No posts available.
        </Typography>
      )}
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={post.id}>
              <PostCard post={post} />
            </div>
          );
        } else {
          return <PostCard key={post.id} post={post} />;
        }
      })}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!hasMore && posts.length > 0 && (
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          You have seen all posts.
        </Typography>
      )}
    </Box>
  );
}
