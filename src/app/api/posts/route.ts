import { NextResponse } from 'next/server';
import { addPost } from '@/lib/postService';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const post = await addPost(body);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('API post error:', error);
        return NextResponse.json(
            { error: 'Post could not be created' },
            { status: 500 }
        );
    }
}
