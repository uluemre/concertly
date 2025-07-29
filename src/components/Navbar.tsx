// src/components/Navbar.tsx
'use client';

import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUsername(parsed.username);
            } catch {
                setUsername(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUsername(null);
        router.push('/');
    };

    return (
        <AppBar position="static" sx={{ bgcolor: 'background.default', boxShadow: 1 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    onClick={() => router.push('/')}
                >
                    <Image
                        src="/logo.png" // logonun yolu
                        alt="Concertly Logo"
                        width={100}
                        height={95}
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </Box>

                <Box>
                    {username ? (
                        <>
                            <span style={{ marginRight: '1rem' }}>👋 {username}</span>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => router.push('/login')}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => router.push('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
