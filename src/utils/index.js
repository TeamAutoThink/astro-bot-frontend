let debounceTimer = null;

export const googleAutocomplete = (inputId, setValue, delay = 200) => {
  const input = document.getElementById(inputId);
  if (!input || !window.google || !window.google.maps) return;

  // Clear any existing event listener (for hot reloading or re-renders)
  input.oninput = null;

  input.oninput = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      initializeAutocomplete(input, setValue);
    }, delay);
  };
};

const initializeAutocomplete = (input, setValue) => {
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
};
