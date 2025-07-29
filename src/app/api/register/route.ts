import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json(
                { message: 'Tüm alanlar zorunludur' },
                { status: 400 }
            );
        }

        // Email veya kullanıcı adı daha önce kullanılmış mı kontrol et
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Kullanıcı adı veya email zaten kayıtlı' },
                { status: 400 }
            );
        }

        // Yeni kullanıcıyı oluştur
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password, // ⚠️ Düz metin olarak kayıt ediliyor (şimdilik)
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (err) {
        console.error('Register error:', err);
        return NextResponse.json(
            { message: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}
