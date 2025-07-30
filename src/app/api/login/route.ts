import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // 🍪 cookie yazmak için

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email ve şifre zorunludur' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            return NextResponse.json(
                { message: 'Geçersiz kullanıcı bilgisi' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        // 🍪 token'ı cookie olarak ayarla
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 gün
        });

        return NextResponse.json({ message: 'Login başarılı' }, { status: 200 });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json(
            { message: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}
