import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // உங்கள் Laravel API base URL
});

// Request செய்யும் போது, token இருக்கா என்று பார்த்து attach பண்ணும்
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
