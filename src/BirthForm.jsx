import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, MenuItem, Typography, Box,
} from '@mui/material';
import { BASE_URL } from './constants';

const BirthForm = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    placeOfBirth: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}${PLANATERY_POSITION}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => console.log('Success:', data))
      .catch(err => console.error('Error:', err));
  };

  useEffect(() => {
    const input = document.getElementById('autocomplete');
    if (!input || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setForm((prev) => ({
        ...prev,
        placeOfBirth: place.formatted_address || place.name,
      }));
    });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Birth Details Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth label="Name" name="name" value={form.name} onChange={handleChange}
          margin="normal" required
        />
        <TextField
          select fullWidth label="Gender" name="gender" value={form.gender} onChange={handleChange}
          margin="normal" required
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          fullWidth type="date" label="Birth Date" name="birthDate" value={form.birthDate}
          onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} required
        />
        <TextField
          fullWidth type="time" label="Birth Time" name="birthTime" value={form.birthTime}
          onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} required
        />
        <TextField
          fullWidth label="Place of Birth" name="placeOfBirth" value={form.placeOfBirth}
          onChange={handleChange} margin="normal" required id="autocomplete"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default BirthForm;
