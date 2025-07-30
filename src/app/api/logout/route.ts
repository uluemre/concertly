// src/app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = cookies();
    cookieStore.delete('token');

    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL));
}
