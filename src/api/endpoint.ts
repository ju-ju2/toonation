import axios from 'axios';

export const endPoints = {
  test: `/api/matching-users`,
  chargeAmount: `/api/charge-amount/{number}`,
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
