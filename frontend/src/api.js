import axios from 'axios';

const endpoint = isRegister
  ? '/api/auth/register'
  : '/api/auth/login';
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export default API;