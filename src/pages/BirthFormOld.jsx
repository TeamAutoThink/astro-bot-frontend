import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, MenuItem, Typography, Box, Grid, Paper, CircularProgress
} from '@mui/material';
import { BASE_URL } from '../utils/constants';

const PLANATERY_POSITION = '/planetary-position'; // Replace with correct endpoint

const BirthForm = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    placeOfBirth: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.gender) errors.gender = 'Gender is required';
    if (!form.birthDate) errors.birthDate = 'Birth date is required';
    if (!form.birthTime) errors.birthTime = 'Birth time is required';
    if (!form.placeOfBirth.trim()) errors.placeOfBirth = 'Place of birth is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setResponse(null);
    setError(null);

    fetch(`${BASE_URL}${PLANATERY_POSITION}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => setError(err.message || 'Something went wrong'))
      .finally(() => setLoading(false));
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
    <Container maxWidth={false} disableGutters sx={{ width: '100vw', p: 4 }}>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>Birth Details Form</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ '& .MuiTextField-root': { mb: 2 } }}>
            <TextField
              fullWidth label="Name" name="name" value={form.name} onChange={handleChange}
              error={!!validationErrors.name} helperText={validationErrors.name} required
            />
            <TextField
              select fullWidth label="Gender" name="gender" value={form.gender} onChange={handleChange}
              error={!!validationErrors.gender} helperText={validationErrors.gender} required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              fullWidth type="date" label="Birth Date" name="birthDate" value={form.birthDate}
              onChange={handleChange} InputLabelProps={{ shrink: true }}
              error={!!validationErrors.birthDate} helperText={validationErrors.birthDate} required
            />
            <TextField
              fullWidth type="time" label="Birth Time" name="birthTime" value={form.birthTime}
              onChange={handleChange} InputLabelProps={{ shrink: true }}
              error={!!validationErrors.birthTime} helperText={validationErrors.birthTime} required
            />
            <TextField
              fullWidth label="Place of Birth" name="placeOfBirth" value={form.placeOfBirth}
              onChange={handleChange} id="autocomplete"
              error={!!validationErrors.placeOfBirth} helperText={validationErrors.placeOfBirth} required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Box>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>API Response</Typography>
          <Paper elevation={2} sx={{ p: 2, minHeight: '400px', whiteSpace: 'pre-wrap' }}>
            {error && (
              <Typography color="error">Error: {error}</Typography>
            )}
            {!error && response && (
              <Typography>
                {typeof response === 'object'
                  ? JSON.stringify(response, null, 2)
                  : response}
              </Typography>
            )}
            {!response && !error && (
              <Typography color="textSecondary">
                Submit the form to see the response here.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BirthForm;
