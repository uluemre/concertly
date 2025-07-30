// src/app/logout/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function LogoutPage() {
    const cookieStore = cookies();
    cookieStore.delete('token'); // 🔥 JWT cookie’sini sil

    redirect('/login'); // Giriş sayfasına yönlendir
}
