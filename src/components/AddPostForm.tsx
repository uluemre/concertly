'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    CircularProgress,
    Alert,
} from '@mui/material';

type PostFormValues = {
    description: string;
    imageUrl?: string;
    artistName?: string;
};

type Artist = {
    name: string;
};

export default function AddPostForm() {
    const [form, setForm] = useState<PostFormValues>({
        description: '',
        imageUrl: '',
        artistName: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [artistsLoading, setArtistsLoading] = useState(true);

    // 🎤 Artist'leri çek
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch('/api/artists');
                const data = await res.json();
                setArtists(data);
            } catch (err) {
                console.error('Sanatçılar alınamadı:', err);
            } finally {
                setArtistsLoading(false);
            }
        };
        fetchArtists();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');
        setSuccess(false);
    };

    const handleSubmit = async () => {
        if (!form.description.trim()) {
            setError('Açıklama zorunludur.');
            return;
        }

        setLoading(true);
        setSuccess(false);

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setForm({ description: '', imageUrl: '', artistName: '' });
                setSuccess(true);
            } else {
                const err = await res.json();
                setError(err.message || 'Sunucu hatası');
            }
        } catch (err) {
            console.error('İstek hatası:', err);
            setError('İstek gönderilirken hata oluştu');
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
                multiline
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
                helperText="Post'a görsel eklemek istersen direkt URL olarak yazabilirsin"
            />

            <TextField
                label="Sanatçı Seç (opsiyonel)"
                name="artistName"
                value={form.artistName}
                onChange={handleChange}
                fullWidth
                select
                disabled={artistsLoading}
                sx={{ mb: 2 }}
            >
                <MenuItem value="">-- Sanatçı Seç --</MenuItem>
                {artists.map((artist) => (
                    <MenuItem key={artist.name} value={artist.name}>
                        {artist.name}
                    </MenuItem>
                ))}
            </TextField>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Post başarıyla eklendi!</Alert>}

            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !form.description.trim()}
                fullWidth
            >
                {loading ? <CircularProgress size={20} /> : 'Gönder'}
            </Button>
        </Box>
    );
}
