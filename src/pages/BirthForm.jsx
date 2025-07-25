import React , {useEffect} from 'react';
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
  birthPlace: yup.string().required('Birth place is required'),
  gender: yup.string().required('Gender is required'),
});

const BirthDetailsForm = () => {
  const {
    register,
    handleSubmit,
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
        birth_lat: 20.3039,
        birth_long: 70.8022,
        birth_time_zone_offset: 5.5,
      };

      console.log('=====base_url=====>', `${BASE_URL}${PREDECTION}`)

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
          {errors.birth_date && <span className="error">{errors.birth_date.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="time"
            {...register('birth_time')}
            disabled={isSubmitting}
          />
          {errors.birth_time && <span className="error">{errors.birth_time.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="autocomplete"
            placeholder="Place of Birth"
            {...register('birthPlace')}
            disabled={isSubmitting}
          />
          {errors.birthPlace && <span className="error">{errors.birthPlace.message}</span>}
        </div>

        <div className="form-group">
          <select {...register('gender')} disabled={isSubmitting}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BirthDetailsForm;
