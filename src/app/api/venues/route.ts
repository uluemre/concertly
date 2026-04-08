import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const venues = await prisma.venue.findMany({
            select: { name: true },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(venues);
    } catch (error) {
        console.error('Error fetching venues:', error);
        return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
    }
}
