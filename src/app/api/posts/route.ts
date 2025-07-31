import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { description, imageUrl, artistName, venueName } = body;

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ message: 'Giriş yapmalısınız' }, { status: 401 });
        }

        const artist = artistName
            ? await prisma.artist.findUnique({ where: { name: artistName } })
            : null;

        const venue = venueName
            ? await prisma.venue.findUnique({ where: { name: venueName } })
            : null;

        const post = await prisma.post.create({
            data: {
                description,
                imageUrl,
                user: { connect: { id: user.id } },
                artist: artist ? { connect: { id: artist.id } } : undefined,
                venue: venue ? { connect: { id: venue.id } } : undefined,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (err) {
        console.error('Post oluşturma hatası:', err);
        return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
    }
}
