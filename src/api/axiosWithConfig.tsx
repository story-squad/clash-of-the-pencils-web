import axios, { AxiosInstance } from 'axios';
import { getToken } from '../utils';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.NODE_API_URL || 'http://localhost:5000';

export const axiosWithAuth = (): AxiosInstance =>
  axios.create({
    baseURL,
    headers: {
      Authorization: getToken(),
    },
  });

export const axiosWithoutAuth = (): AxiosInstance =>
  axios.create({
    baseURL,
  });
