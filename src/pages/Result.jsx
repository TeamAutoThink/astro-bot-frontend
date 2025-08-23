import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../assets/styles/result.css'

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const birthDetails = localStorage.getItem('birth_details')
  let { apiResult } = location.state || JSON.parse(birthDetails)?.body?.prediction || {};

  useEffect(() => {
    if (!apiResult) {
      navigate('/');
    }
  }, [apiResult, navigate]);

  // If apiResult is a string containing Markdown
  const markdown = typeof apiResult === 'string' ? apiResult : '';

  return (
    <div
      className="center-container"
    >
      <div className='result-container'>
        <h2>Your Prediction</h2>
        <ReactMarkdown>{markdown}</ReactMarkdown>
        <div className="center-btn">
          <button onClick={() => navigate('/')} type="button" className="cta-button">
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
