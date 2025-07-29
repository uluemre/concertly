'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // ✅ Token'ı localStorage'a kaydet
            localStorage.setItem('token', data.token);

            // ✅ Ana sayfaya yönlendir
            router.push('/home');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
                Giriş Yap
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !form.email || !form.password}
                fullWidth
            >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
        </Container>
    );
}
