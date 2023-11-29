import axios from 'axios';

const client = axios.create({
  baseURL: 'https://wordzzle-backend-tinodevclumsy.koyeb.app/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;