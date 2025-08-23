import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL, PREDECTION } from '../utils/constants';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import DateInputMask from '../components/Date';
import TimeInputMask from '../components/Time'
import { birthDetailsSchema } from '../utils/birthFormValidation';
import { googleAutocomplete } from '../utils/index'
import { toast } from 'react-toastify';

const BirthDetailsForm = () => {
  localStorage.removeItem('birth_details')
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(birthDetailsSchema),
  });

  const onSubmit = async (formData) => {
    try {

      if (!executeRecaptcha) {
        console.error('Execute reCAPTCHA not available yet');
        // setNotification('reCAPTCHA not ready. Please try again in a moment.');
        return;
      }

      // Get a token for the 'contact' action
      const token = await executeRecaptcha('contact');

      const lat = parseFloat(formData.birth_lat);
      const lng = parseFloat(formData.birth_long);

      const data = {
        ...formData,
        birth_date: formData.birth_date.split('-').reverse().join('-'),
        birth_lat: lat,
        birth_long: lng,
        token
      };

      let body = JSON.stringify(data);
      const response = await fetch(`${BASE_URL}${PREDECTION}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!response.ok){
        toast.error('API error');
        return;
      };

      const result = await response.json();
      
      localStorage.removeItem('birth_details')
      const prediction = result?.prediction || ''
      

      body = JSON.parse(body);
      body['prediction'] = prediction;
      
      localStorage.setItem('birth_details',JSON.stringify(body));

      navigate('/result', { state: { apiResult: prediction } });
    } catch (error) {
      toast.error('API call failed');
      console.error('API call failed:', error);
    }
  };

  useEffect(() => {
    googleAutocomplete('autocomplete', setValue);
  }, [setValue]);

  return (
    <div className="center-container">
      <form className="birth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>
          Discover what the stars say about you <br></br> with the power of AI.
        </h2>

        <div className='form-group'>
          <label>Birth Date</label>
          <DateInputMask {...register('birth_date')} value={watch('birth_date') || ''} />
          {errors.birth_date && <span className="error">{errors.birth_date.message}</span>}
        </div>
        
        <div className='form-group'>
          <label>Birth Time (24 Hour Format)</label>
          <TimeInputMask {...register('birth_time')} value={watch('birth_time') || ''} />
          {errors.birth_time && <span className="error">{errors.birth_time.message}</span>}
        </div>

        <div className="form-group">
          <label>Place of Birth</label>
          <input
            type="text"
            id="autocomplete"
            placeholder="eg. Delhi"
            {...register('birth_place')}
            disabled={isSubmitting}
          />
          {errors.birth_place && (
            <span className="error">{errors.birth_place.message}</span>
          )}
        </div>
        
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
              <Link to="/terms" target="_blank">Terms and Conditions, Privacy Policy and Disclaimer</Link>
            </span>
          </label>
          {errors.terms_accepted && (
            <span className="error">{errors.terms_accepted.message}</span>
          )}
        </div>

        <div className='center-btn'>
          <button 
            className="g-recaptcha"
            data-sitekey="6LcpVa4rAAAAAM84fTv2zc0E75L-6HKzfaOqx7w9"
            data-callback='onSubmit'
            data-action='submit' type="submit" disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthDetailsForm;
