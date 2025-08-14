import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL, PREDECTION } from '../utils/constants';

// Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  birth_day: yup.string().required('Day is required'),
  birth_month: yup.string().required('Month is required'),
  birth_year: yup.string().required('Year is required'),
  birth_hour: yup.string().required('Hour is required'),
  birth_minute: yup.string().required('Minute is required'),
  birth_second: yup.string().required('Second is required'),
  birth_place: yup.string().required('Birth place is required'),
  terms_accepted: yup
  .boolean()
  .oneOf([true], 'You must accept the terms and conditions'),
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

  const getTimezoneOffset = async (lat, lng) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const offsetInSeconds = data.dstOffset + data.rawOffset;
      return offsetInSeconds / 3600; // convert to hours
    } else {
      throw new Error(`Timezone API error: ${data.status}`);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const lat = parseFloat(formData.birth_lat);
      const lng = parseFloat(formData.birth_long);

      const birth_time_zone_offset = await getTimezoneOffset(lat, lng);

      const data = {
        ...formData,
        // birth_date: formatDate(formData.birth_date),
        birth_date: `${formData.birth_year}-${formData.birth_month}-${formData.birth_day}`,
        birth_time: `${formData.birth_hour}:${formData.birth_minute}:${formData.birth_second}`,
        birth_lat: lat,
        birth_long: lng,
        birth_time_zone_offset,
      };

      const response = await fetch(`${BASE_URL}${PREDECTION}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('API error');

      const result = await response.json();
      console.log("=====result=====>", result?.prediction || '')
      navigate('/result', { state: { apiResult: result?.prediction || '' } });
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <select style={{color: 'white'}} {...register('birth_day')} disabled={isSubmitting}>
              <option style={{color: 'black'}} value="">Day</option>
              {[...Array(31)].map((_, i) => (
                <option style={{color: 'black'}} key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select style={{color: 'white'}} {...register('birth_month')} disabled={isSubmitting}>
              <option style={{color: 'black'}} value="">Month</option>
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((month, i) => (
                <option style={{color: 'black'}} key={i + 1} value={i + 1}>{month}</option>
              ))}
            </select>

            <select style={{color: 'white'}} {...register('birth_year')} disabled={isSubmitting}>
              <option style={{color: 'black'}} value="">Year</option>
              {Array.from({ length: 126 }, (_, i) => 2025 - i).map(year => (
                <option style={{color: 'black'}} key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {(errors.birth_day || errors.birth_month || errors.birth_year) && (
            <span className="error">Complete birth date is required</span>
          )}
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', gap: '8px' }}>
            <select style={{color: 'white'}} {...register('birth_hour')} defaultValue="">
              <option style={{color: 'black'}} value="" disabled hidden>Hour</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option style={{color: 'black'}} key={i} value={String(i).padStart(2, '0')}>
                  {String(i).padStart(2, '0')}
                </option>
              ))}
            </select>

            <select style={{color: 'white'}} {...register('birth_minute')} defaultValue="">
              <option style={{color: 'black'}} value="" disabled hidden>Minute</option>
              {Array.from({ length: 60 }, (_, i) => (
                <option style={{color: 'black'}} key={i} value={String(i).padStart(2, '0')}>
                  {String(i).padStart(2, '0')}
                </option>
              ))}
            </select>

            <select style={{color: 'white'}} {...register('birth_second')} defaultValue="">
              <option style={{color: 'black'}} value="" disabled hidden>Second</option>
              {Array.from({ length: 60 }, (_, i) => (
                <option style={{color: 'black'}} key={i} value={String(i).padStart(2, '0')}>
                  {String(i).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          {(errors.birth_hour || errors.birth_minute || errors.birth_second) && (
            <span className="error">Complete birth time is required</span>
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

        {/* Hidden fields to store lat/lng from Places API */}
        <input type="hidden" {...register('birth_lat')} />
        <input type="hidden" {...register('birth_long')} />

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              {...register('terms_accepted')}
              disabled={isSubmitting}
            />
            <span style={{color : 'white'}}>
              I accept the{' '}
              <Link to="/terms" target="_blank">Terms and Conditions</Link>,{' '}
              <Link to="/privacy" target="_blank">Privacy Policy</Link>, and{' '}
              <Link to="/disclaimer" target="_blank">Disclaimer</Link>.
            </span>
          </label>
          {errors.terms_accepted && (
            <span className="error">{errors.terms_accepted.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BirthDetailsForm;
