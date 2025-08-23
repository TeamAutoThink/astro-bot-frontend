import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import { ToastContainer } from 'react-toastify';
import BirthForm from './pages/BirthFormOld';
import Home from './pages/Home';
import BirthDetailsForm from './pages/BirthForm';
import Result from './pages/Result';
import Condition from './pages/Condition';

import NotFound from './pages/NotFound'

import { GOOGLE_API_KEY } from './utils/constants';

const libraries = ['places'];

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY, // Replace with your actual API key
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<BirthDetailsForm />} />
          {/* <Route path="/birth-details-old" element={<BirthForm />} /> */}
          <Route path="/result" element={<Result />} />
          <Route path="/terms" element={<Condition />} />
          {/* <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* Toast container for showing notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
