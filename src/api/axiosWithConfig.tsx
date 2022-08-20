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
 * @returns axios instance with Authorization header containing an access token retrieved from session storage to use for authentication in the API request.
 */
export const axiosWithAuth0 = (): AxiosInstance => {
  const accessToken = sessionStorage.getItem('token');
  return axios.create({
    baseURL,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  // ALTERNATIVE APPROACH
  // const tokenInstance = axios.create({
  //   baseURL: 'https://dev-7oahzjpy.us.auth0.com/oauth',
  //   headers: { 'content-type': 'application/json' },
  // });
  // const accessToken = tokenInstance
  //   .post('/token', {
  //     client_id: 'elB6hg4MrjVPZgjKHTLQBxeDFjUzraHx',
  //     client_secret:
  //       'z8P3VJxe8zbRwOEEulcqMuqfwmpyg51HZ1LUsEiUrmkwfFwUTYO_VxnDco1GW1HE',
  //     audience: 'http://localhost:8000',
  //     grant_type: 'client_credentials',
  //   })
  //   .then((response) => response.data.access_token);
  // return axios.create({
  //   baseURL,
  //   headers: {
  //     authorization: `Bearer ${accessToken}`,
  //   },
  // });
};
