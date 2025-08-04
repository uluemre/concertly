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

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Kayıt başarısız');
            }

            setSuccess(true);
            setForm({ username: '', email: '', password: '' });
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
                        Kayıt Ol
                    </Typography>

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Kayıt başarılı! 🎉
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        label="Kullanıcı Adı"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

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
                        disabled={loading || !form.username || !form.email || !form.password}
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
                        {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                    </Button>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
