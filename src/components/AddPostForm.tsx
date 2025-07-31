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
    venueName?: string;
};

type Artist = { name: string };
type Venue = { name: string };

export default function AddPostForm() {
    const [form, setForm] = useState<PostFormValues>({
        description: '',
        imageUrl: '',
        artistName: '',
        venueName: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [artistRes, venueRes] = await Promise.all([
                    fetch('/api/artists'),
                    fetch('/api/venues'),
                ]);

                const artistData = await artistRes.json();
                const venueData = await venueRes.json();

                setArtists(artistData);
                setVenues(venueData);
            } catch (err) {
                console.error('Veri alınamadı:', err);
            } finally {
                setLoadingData(false);
            }
        };
        fetchOptions();
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setForm({ description: '', imageUrl: '', artistName: '', venueName: '' });
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
                helperText="Bir görsel linki eklemek istersen buraya yapıştırabilirsin"
            />

            <TextField
                label="Sanatçı Seç (opsiyonel)"
                name="artistName"
                value={form.artistName}
                onChange={handleChange}
                select
                fullWidth
                sx={{ mb: 2 }}
                disabled={loadingData}
            >
                <MenuItem value="">-- Sanatçı Seç --</MenuItem>
                {artists.map((artist) => (
                    <MenuItem key={artist.name} value={artist.name}>
                        {artist.name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Mekan Seç (opsiyonel)"
                name="venueName"
                value={form.venueName}
                onChange={handleChange}
                select
                fullWidth
                sx={{ mb: 2 }}
                disabled={loadingData}
            >
                <MenuItem value="">-- Mekan Seç --</MenuItem>
                {venues.map((venue) => (
                    <MenuItem key={venue.name} value={venue.name}>
                        {venue.name}
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
