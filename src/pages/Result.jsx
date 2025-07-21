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
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        maxWidth: '800px',
        margin: '2rem auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        overflowX: 'auto',
      }}
    >
      <h2>API Result</h2>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <button onClick={() => navigate('/')}>Back to Form</button>
    </div>
  );
};

export default Result;
