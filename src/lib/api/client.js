/* eslint-disable no-undef */
import axios from 'axios';

const client = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api'
      : 'https://wordzzle-backend-tinodevclumsy.koyeb.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
