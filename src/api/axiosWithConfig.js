import axios from 'axios';
import { getToken } from '../utils';

export const axiosWithAuth = axios.create({
  baseURL: process.env.NODE_API_URL || 'http://localhost:5000',
  headers: {
    Authorization: getToken(),
  },
});

export const axiosWithoutAuth = axios.create({
  baseURL: process.env.NODE_API_URL || 'http://localhost:5000',
});
