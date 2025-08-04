'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const concertTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        primary: {
            main: '#D81B60', // neon pembe
        },
        text: {
            primary: '#E0E0E0',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label': { color: '#B39DDB' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#512DA8',
                        },
                        '&:hover fieldset': {
                            borderColor: '#9575CD',
                        },
                    },
                },
            },
        },
    },
});

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

            localStorage.setItem('token', data.token);
            router.push('/home');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={concertTheme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    background: 'radial-gradient(circle at center, #2c003e 0%, #121212 60%)',
                }}
            >

                <Paper
                    elevation={8}
                    sx={{
                        p: 4,
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        width: '100%',
                        maxWidth: 400,
                        boxShadow: '0 0 20px #D81B60',
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
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
                        label="Şifre"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 3 }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading || !form.email || !form.password}
                        fullWidth
                        sx={{
                            py: 1.5,
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: '#AD1457',
                                boxShadow: '0 0 10px #AD1457',
                            },
                        }}
                    >
                        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </Button>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
