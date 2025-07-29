// src/components/AddPostForm.tsx
'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';

type PostFormValues = {
    description: string;
    imageUrl?: string;
    artistName?: string;
};

export default function AddPostForm() {
    const [form, setForm] = useState<PostFormValues>({
        description: '',
        imageUrl: '',
        artistName: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        console.log('form güncellendi:', { ...form, [name]: value }); // test logu
    };

    const handleSubmit = async () => {
        if (!form.description.trim()) return;

        setLoading(true);
        setSuccess(false);

        try {
            console.log('form gönderiliyor:', form); // test logu

            const token = localStorage.getItem('token');

            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });


            if (res.ok) {
                setForm({ description: '', imageUrl: '', artistName: '' });
                setSuccess(true);
                console.log('Post başarıyla eklendi.');
            } else {
                console.error('Sunucu hatası:', await res.json());
            }
        } catch (err) {
            console.error('İstek hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Yeni Post Oluştur
            </Typography>

            <TextField
                label="Açıklama"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                rows={3}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Görsel URL (opsiyonel)"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Sanatçı Adı (opsiyonel)"
                name="artistName"
                value={form.artistName}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !form.description.trim()}
            >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
            </Button>

            {success && (
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                    Post başarıyla eklendi!
                </Typography>
            )}
        </Box>
    );
}
