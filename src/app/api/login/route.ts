import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'Email ve şifre zorunludur' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 });
        }

        if (user.password !== password) {
            return NextResponse.json({ message: 'Şifre hatalı' }, { status: 401 });
        }

        // ✅ DÜZENLEME: id yerine userId gönder
        const token = jwt.sign(
            { userId: user.id }, // ✅ BURASI
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        return NextResponse.json({ message: 'Giriş başarılı', token }, { status: 200 });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
    }
}
