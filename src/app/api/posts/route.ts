// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    // ✅ Cookie'den token'ı al
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Token eksik' }, { status: 401 });
    }

    let userId;
    try {
        // ✅ Token'ı doğrula
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        userId = decoded.id; // dikkat: "userId" değil "id" çünkü jwt.sign içinde "id" kullandık
    } catch (err) {
        return NextResponse.json({ message: 'Geçersiz token' }, { status: 401 });
    }

    const body = await req.json();
    const { description, imageUrl, artistName } = body;

    try {
        const post = await prisma.post.create({
            data: {
                description,
                imageUrl,
                user: {
                    connect: { id: userId },
                },
                artist: artistName
                    ? {
                        connectOrCreate: {
                            where: { name: artistName },
                            create: { name: artistName },
                        },
                    }
                    : undefined,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Post eklenemedi:', error);
        return NextResponse.json(
            { message: 'Post oluşturulurken hata oluştu' },
            { status: 500 }
        );
    }
}
