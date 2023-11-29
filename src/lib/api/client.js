import axios from 'axios';

const client = axios.create();

client.defaults.withCredentials = true;

client.defaults.baseURL = 'https://wordzzle-backend-tinodevclumsy.koyeb.app/api'

export default client;
