export async function fetchTrendingConcerts() {
    const res = await fetch('http://localhost:3000/api/ticketmaster', {
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error('Local API route failed');
        return [];
    }

    return res.json();
}
