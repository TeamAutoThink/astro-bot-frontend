import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div id='terms-condition' style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{ textAlign : 'center'}}>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p><strong>Last Updated:</strong> [Insert Date]</p>

      <h2>1. Information We Collect</h2>
      <p>We collect birth details, name, email, IP address, and device data.</p>

      <h2>2. How We Use Your Information</h2>
      <p>To generate predictions, respond to queries, and improve services.</p>

      <h2>3. How Your Data is Processed</h2>
      <p>Input data may be sent to third-party AI models such as ChatGPT or Gemini.</p>

      <h2>4. Data Sharing and Disclosure</h2>
      <p>No data selling. Shared only with necessary services or as required by law.</p>

      <h2>5. Data Security</h2>
      <p>We take reasonable measures but cannot guarantee absolute security.</p>

      <h2>6. Your Rights</h2>
      <p>You may request access, correction, or deletion of your data.</p>

      <h2>7. Children’s Privacy</h2>
      <p>This service is not intended for users under 18 years of age.</p>

      <h2>8. Changes to This Policy</h2>
      <p>We may update this policy. Continued use indicates acceptance.</p>

      <h2>9. Contact</h2>
      <p>📧 [Insert Email] | 🌐 [Insert Website URL]</p>

      <hr />
      <p>
        <Link to="/terms">Terms and Conditions</Link> | <Link to="/disclaimer">Disclaimer</Link>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
