import React from 'react';

const DateInputMask = React.forwardRef(({ value, onChange, onBlur, name }, ref) => {
  const formatDate = (val, isDeleting = false) => {
    const digits = val.replace(/\D/g, '').slice(0, 8);
    let formatted = '';

    if (digits.length <= 2) {
      formatted = digits;
      if (digits.length === 2 && !isDeleting) {
        formatted += '-';
      }
    } else if (digits.length <= 4) {
      formatted = `${digits.substring(0, 2)}-${digits.substring(2)}`;
      if (digits.length === 4 && !isDeleting) {
        formatted += '-';
      }
    } else {
      formatted = `${digits.substring(0, 2)}-${digits.substring(2, 4)}-${digits.substring(4)}`;
    }

    return formatted;
  };

  const handleChange = (e) => {
    const isDeleting = e.nativeEvent?.inputType === 'deleteContentBackward';
    const rawValue = e.target.value;
    const formatted = formatDate(rawValue, isDeleting);

    // Create a native-looking event
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: formatted,
        name,
      },
    };

    onChange(syntheticEvent);
  };

  return (
    <input
      type="text"
      name={name}
      ref={ref}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder="dd-mm-yyyy"
      maxLength={10}
      autoComplete="off"
    />
  );
});

export default DateInputMask;
