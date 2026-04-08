// src/app/api/artists/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const artists = await prisma.artist.findMany({
            select: { name: true },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(artists);
    } catch (error) {
        console.error('Error fetching artists:', error);
        return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
    }
}
