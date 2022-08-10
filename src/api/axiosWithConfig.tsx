import axios, { AxiosInstance } from 'axios';
import { token } from '../utils';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface AxiosGeneratorProps {
  timeoutInSeconds?: number;
}

export const axiosWithAuth = ({
  timeoutInSeconds = 0,
}: AxiosGeneratorProps = {}): AxiosInstance => {
  const Authorization = token.get();
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
/**
 *
 * @title axiosWithAuth0
 * @param accessToken: obtained by calling getAccessTokenSilently from the useAuth0 hook in the calling component.
 * @returns axios instance with Authorization header containing a fresh access token to use for authentication in the API request.
 */
export const axiosWithAuth0 = (accessToken: string): AxiosInstance =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
