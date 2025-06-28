import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import BirthForm from './BirthForm';

const libraries = ['places'];

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your actual API key
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return <BirthForm />;
};

export default App;
