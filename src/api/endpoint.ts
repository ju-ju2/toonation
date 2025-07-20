import axios from 'axios';

export const endPoints = {
  chargeCard: '/api/charge/card',
  chargeCulture: '/api/charge/culture',
  chargeCulturePin: '/api/culture/:pin',
};

export const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const customRequest = (token?: string) => {
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
