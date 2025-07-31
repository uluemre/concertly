import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.TICKETMASTER_API_KEY!;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const artist = searchParams.get('artist');
    const venue = searchParams.get('venue');

    let query = '';
    if (artist) query += `&keyword=${encodeURIComponent(artist)}`;
    if (venue) query += `&venueId=${encodeURIComponent(venue)}`;

    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&countryCode=TR&size=10${query}`);
    const data = await res.json();

    const events = data._embedded?.events?.map((event: any) => ({
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate,
        venue: event._embedded?.venues?.[0]?.name,
        url: event.url,
    })) || [];

    return NextResponse.json(events);
}
