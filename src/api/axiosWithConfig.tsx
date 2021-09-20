import axios, { AxiosInstance } from 'axios';
import { token } from '../utils';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const axiosWithAuth = (): AxiosInstance => {
  const Authorization = token.get();
  return axios.create({
    baseURL,
    headers: { Authorization },
  });
};

export const axiosWithoutAuth = (): AxiosInstance =>
  axios.create({
    baseURL,
  });
