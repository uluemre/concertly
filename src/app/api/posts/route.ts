import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { description, imageUrl, artistId } = body;

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ message: 'Giriş yapmalısınız' }, { status: 401 });
        }

        const post = await prisma.post.create({
            data: {
                description,
                imageUrl,
                artist: artistId ? { connect: { id: artistId } } : undefined,
                user: { connect: { id: user.id } }, // 🔥 İşte bu satır düzeltildi
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (err) {
        console.error('Post oluşturma hatası:', err);
        return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
    }
}
