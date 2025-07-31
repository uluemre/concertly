import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const venues = await prisma.venue.findMany({
        select: { name: true },
        orderBy: { name: 'asc' },
    });

    return NextResponse.json(venues);
}
