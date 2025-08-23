// src/constants.js
const ENV = import.meta.env
export const BASE_URL = ENV.VITE_BASE_URL || 'http://localhost:3000';
export const PREDECTION = '/api/prediction';
export const GOOGLE_API_KEY = ENV.VITE_GOOGLE_API_KEY
export const REACT_APP_RECAPTCHA_SITE_KEY = ENV.VITE_REACT_APP_RECAPTCHA_SITE_KEY

