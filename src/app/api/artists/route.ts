// src/app/api/artists/route.ts
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
    const artists = await prisma.artist.findMany({
        select: { name: true },
        orderBy: { name: 'asc' },

    });

    return NextResponse.json(artists);
}
