import client from './client';

export const login = ({ username, password }) => {
  return client.post('/auth/login', { username, password })
};

export const register = ({ username, password }) => {
  return client.post('/auth/register', { username, password });
};

export const check = () => {
  return client.get('/auth/check');
};

export const logout = () => {
  return client.post('/auth/logout');
};
