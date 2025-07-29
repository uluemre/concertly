// src/app/api/posts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'Token eksik' }, { status: 401 });
    }

    let decoded: any;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        return NextResponse.json({ message: 'Geçersiz token' }, { status: 401 });
    }

    const userId = decoded.userId;

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
            { message: 'Post oluşturulurken hata oluştu', error },
            { status: 500 }
        );
    }
}
