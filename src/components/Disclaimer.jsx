import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/privacy.css'

const Disclaimer = () => {
  return (
    <div id='terms-condition' style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{textAlign : 'center'}}>Disclaimer</h1>
      <p><strong>Effective Date:</strong>1st Augest 2025</p>
      <p><strong>Last Updated:</strong>1st Augest 2025</p>

      <p>The content and predictions provided by astro.auto-think.in are for informational and entertainment purposes only.</p>

      <h2>1. No Professional Advice</h2>
      <p>This is not a replacement for professional medical, legal, financial, or psychological advice.</p>

      <h2>2. Accuracy of Predictions</h2>
      <p>We do not guarantee the accuracy or effectiveness of predictions.</p>

      <h2>3. Third-Party AI Models</h2>
      <p>We rely on third-party AI APIs and do not control their outputs.</p>

      <h2>4. User Responsibility</h2>
      <p>You are solely responsible for your decisions and actions based on our platform’s content.</p>

      <h2>5. Limitation of Liability</h2>
      <p>We are not liable for any outcomes resulting from use of the service.</p>

      <h2>6. Spiritual & Cultural Context</h2>
      <p>Vedic astrology is traditional and interpretive. Interpretations may vary by region or culture.</p>

      <h2>7. Contact Us</h2>
      <p>📧 sales@auto-think.in | 🌐 <a href='https://astro.auto-think.in/'>https://astro.auto-think.in/</a></p>
    </div>
  );
};

export default Disclaimer;
