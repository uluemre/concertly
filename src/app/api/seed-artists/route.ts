// src/app/api/seed-artists/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY!;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export async function GET() {
    let totalSaved = 0;
    const maxPages = 50;

    try {
        for (let page = 0; page < maxPages; page++) {
            const res = await fetch(
                `${BASE_URL}?apikey=${TICKETMASTER_API_KEY}&countryCode=TR&size=20&page=${page}`
            );
            const data = await res.json();
            const events = data._embedded?.events || [];

            for (const event of events) {
                const attractions = event._embedded?.attractions || [];
                for (const artist of attractions) {
                    const name = artist.name;
                    const imageUrl = artist.images?.[0]?.url || null;
                    const bio = artist.classifications?.[0]?.genre?.name || '';

                    await prisma.artist.upsert({
                        where: { name },
                        update: {},
                        create: { name, imageUrl, bio },
                    });

                    totalSaved++;
                }
            }
        }

        return NextResponse.json({ message: 'Artists synced', count: totalSaved });
    } catch (err) {
        console.error('Artist çekme hatası:', err);
        return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 });
    }
}
