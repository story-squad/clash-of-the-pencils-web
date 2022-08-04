import axios, { AxiosInstance } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface AxiosGeneratorProps {
  timeoutInSeconds?: number;
}

async function getAccessToken(): Promise<string> {
  return await useAuth0().getAccessTokenSilently();
}

export const axiosWithAuth = ({
  timeoutInSeconds = 0,
}: AxiosGeneratorProps = {}): AxiosInstance => {
  const Authorization = getAccessToken();
  return axios.create({
    baseURL,
    headers: { Authorization },
    timeout: timeoutInSeconds * 1000,
  });
};

export const axiosWithoutAuth = ({
  timeoutInSeconds = 0,
}: AxiosGeneratorProps = {}): AxiosInstance =>
  axios.create({
    baseURL,
    timeout: timeoutInSeconds * 1000,
  });
