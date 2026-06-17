// src/lib/ticketmaster.ts

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY || "YOUR_API_KEY";
const TICKETMASTER_BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  images: { url: string; width: number; height: number }[];
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
  };
  _embedded?: {
    venues?: {
      name: string;
      city?: { name: string };
      country?: { name: string };
    }[];
    attractions?: {
      name: string;
    }[];
  };
}

export async function fetchEvents(city?: string, keyword?: string): Promise<TicketmasterEvent[]> {
  try {
    let url = `${TICKETMASTER_BASE_URL}/events.json?apikey=${TICKETMASTER_API_KEY}&classificationName=music`;

    if (city) {
      url += `&city=${encodeURIComponent(city)}`;
    }
    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Ticketmaster: ${response.status}`);
    }

    const data = await response.json();

    // Return empty array if no events found
    if (!data._embedded || !data._embedded.events) {
      return [];
    }

    return data._embedded.events;
  } catch (error) {
    console.error("Error fetching events from Ticketmaster:", error);
    return [];
  }
}

export async function fetchEventDetails(eventId: string): Promise<TicketmasterEvent | null> {
  try {
    const url = `${TICKETMASTER_BASE_URL}/events/${eventId}.json?apikey=${TICKETMASTER_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch event details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for event ${eventId}:`, error);
    return null;
  }
}
