import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { apiResult } = location.state || {};

  if (!apiResult) {
    navigate('/');
    return null;
  }

  // If apiResult is a string containing Markdown
  const markdown = typeof apiResult === 'string' ? apiResult : '';

  return (
    <div
      className="center-container"
    >
      <div className='result-container'>
        <h2>Your Prediction</h2>
        <ReactMarkdown>{markdown}</ReactMarkdown>
        <div class="center-btn">
          <button onClick={() => navigate('/')} type="button" className="cta-button">
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
