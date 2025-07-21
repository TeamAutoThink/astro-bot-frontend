import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import BirthForm from './pages/BirthFormOld';
import Home from './pages/Home';
import BirthDetailsForm from './pages/BirthForm';

const libraries = ['places'];

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your actual API key
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  // return <BirthForm />;
  // return <Home />
  // return <BirthDetailsForm />
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/birth-details" element={<BirthDetailsForm />} />
        <Route path="/result" element={<Result />} />

      </Routes>
    </Router>
  );
};

export default App;
