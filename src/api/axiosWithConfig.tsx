import axios, { AxiosInstance } from 'axios';
import { getToken } from '../utils';

export const axiosWithAuth = (): AxiosInstance =>
  axios.create({
    baseURL: process.env.NODE_API_URL || 'http://localhost:5000',
    headers: {
      Authorization: getToken(),
    },
  });

export const axiosWithoutAuth = (): AxiosInstance =>
  axios.create({
    baseURL: process.env.NODE_API_URL || 'http://localhost:5000',
  });
