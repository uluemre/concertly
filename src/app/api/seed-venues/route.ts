// src/app/api/seed-venues/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY!;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/venues.json';

export async function GET() {
    let totalSaved = 0;
    const maxPages = 5; // 🔄 daha fazlası için artırabilirsin

    try {
        for (let page = 0; page < maxPages; page++) {
            const res = await fetch(
                `${BASE_URL}?apikey=${TICKETMASTER_API_KEY}&countryCode=TR&size=20&page=${page}`
            );
            const data = await res.json();

            const venues = data._embedded?.venues || [];
            if (venues.length === 0) break;

            for (const venue of venues) {
                const name = venue.name;
                const imageUrl = venue.images?.[0]?.url || null;
                const description = venue.city?.name || '';

                await prisma.venue.upsert({
                    where: { name },
                    update: {},
                    create: { name, imageUrl, description },
                });

                totalSaved++;
            }
        }

        return NextResponse.json({ message: 'Venues synced', count: totalSaved });
    } catch (err) {
        console.error('Venue çekme hatası:', err);
        return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 });
    }
}
