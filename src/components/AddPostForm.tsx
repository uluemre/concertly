'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Alert,
    Autocomplete,
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

                console.log('🎤 artistData:', artistData);
                console.log('🏟 venueData:', venueData); // 🔥 bunu ekle!

                setArtists(artistData || []);
                setVenues(venueData || []);
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

            <Autocomplete
                options={artists}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                value={artists.find((a) => a.name === form.artistName) || null}
                onChange={(_, newValue) =>
                    setForm((prev) => ({ ...prev, artistName: newValue?.name || '' }))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Sanatçı Seç (opsiyonel)"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                )}
            />




            <Autocomplete
                options={venues}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                value={venues.find((v) => v.name === form.venueName) || null}
                onChange={(_, newValue) =>
                    setForm((prev) => ({ ...prev, venueName: newValue?.name || '' }))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Mekan Seç (opsiyonel)"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                )}
            />


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
