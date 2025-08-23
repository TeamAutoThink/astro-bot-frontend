import * as yup from 'yup';

// Helper function
const parseDate = (value) => {
  const [dd, mm, yyyy] = value.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
};

const today = new Date();
const minDate = new Date(today);
minDate.setFullYear(today.getFullYear() - 100);

const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 2);

export const birthDetailsSchema = yup.object().shape({
  birth_place: yup.string().required('Birth place is required'),
  terms_accepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  birth_date: yup
    .string()
    .required('Date is required')
    .matches(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in dd-mm-yyyy format')
    .test('valid-date', 'Invalid calendar date', (value) => {
      if (!value) return false;
      const [dd, mm, yyyy] = value.split('-').map(Number);
      const date = new Date(yyyy, mm - 1, dd);
      return (
        date.getDate() === dd &&
        date.getMonth() === mm - 1 &&
        date.getFullYear() === yyyy
      );
    })
    .test('date-range', 'Date must be within the allowed range', (value) => {
      if (!value) return false;
      const date = parseDate(value);
      return date >= minDate && date <= maxDate;
    }),
  birth_time: yup
    .string()
    .required('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Time must be in valid hh:mm:ss format')
    .test('valid-time', 'Invalid time', (value) => {
      if (!value) return false;
      const [hh, mm, ss] = value.split(':').map(Number);
      return (
        hh >= 0 && hh <= 23 &&
        mm >= 0 && mm <= 59 &&
        ss >= 0 && ss <= 59
      );
    })
});
