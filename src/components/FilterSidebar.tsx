'use client';

import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useState } from 'react';

export default function FilterSidebar() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('all');

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedGenres(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedCities(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 250,
                height: '100%',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                position: 'sticky',
                top: 80,
                alignSelf: 'flex-start',
                ml: 0,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>

            {/* Genre */}
            <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom>
                    Genre
                </Typography>
                <FormGroup>
                    {['Rock', 'Pop', 'Jazz', 'Hip-Hop'].map(genre => (
                        <FormControlLabel
                            key={genre}
                            control={
                                <Checkbox
                                    value={genre}
                                    checked={selectedGenres.includes(genre)}
                                    onChange={handleGenreChange}
                                />
                            }
                            label={genre}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Divider />

            {/* Date */}
            <Box mt={3} mb={3}>
                <Typography variant="subtitle2" gutterBottom>
                    Date
                </Typography>
                <RadioGroup value={selectedDate} onChange={handleDateChange}>
                    <FormControlLabel value="all" control={<Radio />} label="All Dates" />
                    <FormControlLabel value="today" control={<Radio />} label="Today" />
                    <FormControlLabel value="week" control={<Radio />} label="This Week" />
                    <FormControlLabel value="month" control={<Radio />} label="This Month" />
                </RadioGroup>
            </Box>

            <Divider />

            {/* City */}
            <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                    City
                </Typography>
                <FormGroup>
                    {['Istanbul', 'Ankara', 'Izmir'].map(city => (
                        <FormControlLabel
                            key={city}
                            control={
                                <Checkbox
                                    value={city}
                                    checked={selectedCities.includes(city)}
                                    onChange={handleCityChange}
                                />
                            }
                            label={city}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    );
}
