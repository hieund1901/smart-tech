import axios from 'axios';
import { store } from '../state/store';

const api = axios.create({
  baseURL: 'http://localhost:8888/api',
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use(function (config): any {
  const token: string | undefined = JSON.parse(localStorage.getItem('accessToken')!);

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export default api;
