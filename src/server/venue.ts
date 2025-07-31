// src/server/venue.ts
import prisma from '@/lib/prisma';

export async function getVenueWithPosts(name: string) {
  return await prisma.venue.findUnique({
    where: { name },
    include: {
      posts: {
        include: {
          user: true,
          artist: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}
