import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div  id='terms-condition' style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{ textAlign: 'center'}}>Terms and Conditions</h1>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p><strong>Last Updated:</strong> [Insert Date]</p>

      <p>
        Welcome to [Your App Name] ("we", "our", or "us"). These Terms and Conditions
        ("Terms") govern your access to and use of our platform, which provides Vedic
        astrology-based predictions using AI technologies and large language models
        (LLMs) such as OpenAI’s ChatGPT, Google Gemini, and others.
      </p>

      <h2>1. Nature of the Service</h2>
      <p>The predictions provided are informational and entertainment in nature.</p>

      <h2>2. User Eligibility</h2>
      <p>You must be at least 18 years old to use this Service.</p>

      <h2>3. User Data & Privacy</h2>
      <p>
        We collect personal data such as birth details, which may be processed via
        third-party AI APIs. See our <Link to="/privacy">Privacy Policy</Link> for more.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>We are not liable for outcomes based on use of the service.</p>

      <h2>5. Intellectual Property</h2>
      <p>All content belongs to [Your App Name] or its licensors.</p>

      <h2>6. Acceptable Use</h2>
      <p>No unlawful or abusive behavior is allowed on the platform.</p>

      <h2>7. Third-Party Services</h2>
      <p>
        We integrate with third-party AI services and are not responsible for their
        data practices.
      </p>

      <h2>8. Modifications to Terms</h2>
      <p>We may update the Terms at any time. Continued use implies acceptance.</p>

      <h2>9. Termination</h2>
      <p>We may suspend or terminate access if you violate these Terms.</p>

      <h2>10. Governing Law</h2>
      <p>These Terms are governed by the laws of [Insert Country/State].</p>

      <h2>11. Contact Us</h2>
      <p>📧 [Insert Email] | 🌐 [Insert Website URL]</p>

      <hr />
      <p>
        <Link to="/privacy">Privacy Policy</Link> | <Link to="/disclaimer">Disclaimer</Link>
      </p>
    </div>
  );
};

export default Terms;
