import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, PREDECTION } from '../utils/constants';

// Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  birth_date: yup.string().required('Birth date is required'),
  birth_time: yup.string().required('Birth time is required'),
  birth_place: yup.string().required('Birth place is required'),
  // gender: yup.string().required('Gender is required'),
});

const BirthDetailsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
        birth_date: formatDate(formData.birth_date),
        birth_time: `${formData.birth_time}:00`,
        birth_lat: parseFloat(formData.birth_lat),
        birth_long: parseFloat(formData.birth_long),
        birth_time_zone_offset: 5.5,
      };

      const response = await fetch(`${BASE_URL}${PREDECTION}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const result = await response.json();
      navigate('/result', { state: { apiResult: result } });
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  useEffect(() => {
    const input = document.getElementById('autocomplete');
    if (!input || !window.google || !window.google.maps) return;

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)'],
      fields: ['formatted_address', 'geometry', 'name'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const placeName = place.formatted_address || place.name;

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setValue('birth_place', placeName);
        setValue('birth_lat', lat);
        setValue('birth_long', lng);
      }
    });
  }, [setValue]);

  return (
    <div className="center-container">
      <form className="birth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>
          Enter Your
          <br />
          Birth Details
        </h1>

        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            {...register('name')}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="date"
            {...register('birth_date')}
            disabled={isSubmitting}
          />
          {errors.birth_date && (
            <span className="error">{errors.birth_date.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="time"
            {...register('birth_time')}
            disabled={isSubmitting}
          />
          {errors.birth_time && (
            <span className="error">{errors.birth_time.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="autocomplete"
            placeholder="Place of Birth"
            {...register('birth_place')}
            disabled={isSubmitting}
          />
          {errors.birth_place && (
            <span className="error">{errors.birth_place.message}</span>
          )}
        </div>

        {/* <div className="form-group">
          <select {...register('gender')} disabled={isSubmitting}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="error">{errors.gender.message}</span>
          )}
        </div> */}

        {/* Hidden fields for lat/lng */}
        <input type="hidden" {...register('birth_lat')} />
        <input type="hidden" {...register('birth_long')} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BirthDetailsForm;
