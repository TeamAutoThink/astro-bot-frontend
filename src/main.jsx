import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import { REACT_APP_RECAPTCHA_SITE_KEY } from './utils/constants.js'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleReCaptchaProvider
      reCaptchaKey={REACT_APP_RECAPTCHA_SITE_KEY}
    >
      <App />
    </GoogleReCaptchaProvider>
  </StrictMode>,
)
