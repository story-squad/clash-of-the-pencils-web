import axios, { AxiosInstance } from 'axios';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface AxiosGeneratorProps {
  authToken?: string;
}

export const axiosWithAuth = ({
  authToken,
}: AxiosGeneratorProps): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export const axiosWithoutAuth = (): AxiosInstance =>
  axios.create({
    baseURL,
  });
