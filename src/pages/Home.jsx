import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/birth-details');
  };


  return (
    <div className="center-container">
      <form className="birth-form home-page">
        <h1>
          Get Your Free
          <br />
          Astrology Analysis
        </h1>
        <p>
          Enter your birth details and unlock
          <br />
          insights about your personality,
          <br />
          career, love life, and more.
        </p>
        <div class="center-btn">
          <button type="button" className="cta-button" onClick={handleClick}>
            Get My Free Analysis
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Home;
