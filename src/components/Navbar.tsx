// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Kullanıcı çekilemedi:', err);
                setUser(null);
            }
        };

        fetchUser();
    }, [pathname]);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link href="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
                        concertly
                    </Link>
                </Typography>

                {user ? (
                    <>
                        <Button color="inherit" component={Link} href={`/user/${user.username}`}>
                            Profil
                        </Button>
                        <Button color="inherit" component={Link} href="/api/logout">
                            Çıkış
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} href="/login">
                            Giriş Yap
                        </Button>
                        <Button color="inherit" component={Link} href="/register">
                            Kayıt Ol
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
