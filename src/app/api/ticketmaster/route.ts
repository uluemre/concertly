// src/app/api/ticketmaster/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = process.env.TICKETMASTER_API_KEY;
    if (process.env.NODE_ENV !== 'production') {
        console.log("📡 TICKETMASTER_API_KEY:", API_KEY);
    }

    if (!API_KEY) {
        return NextResponse.json({ error: 'API key missing' }, { status: 500 });
    }

    const URL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=TR&size=10&sort=date,asc&apikey=${API_KEY}`;



    try {
        const res = await fetch(URL);
        const data = await res.json();

        if (process.env.NODE_ENV !== 'production') {
            console.log("🎟️ Ticketmaster API response:", JSON.stringify(data, null, 2));
        }

        const concerts = data._embedded?.events?.map((event: any) => ({
            id: event.id,
            name: event.name,
            image: event.images?.[0]?.url,
            date: event.dates?.start?.localDate,
            venue: event._embedded?.venues?.[0]?.name,
        })) || [];

        return NextResponse.json(concerts);
    } catch (error) {
        console.error('❌ Error in route handler:', error);
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}
