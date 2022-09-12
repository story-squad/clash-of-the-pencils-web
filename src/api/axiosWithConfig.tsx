import axios, { AxiosInstance } from 'axios';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface AxiosGeneratorProps {
  timeoutInSeconds?: number;
}
/**
 * @title axiosWithAuth
 * @description This is a utility function that returns an axios instance
 * with the baseURL set to the REACT_APP_API_URL value found in the .env file
 * (defaults to localhost:8000), and the timeout set to the timeoutInSeconds
 * parameter. This function attaches the Authorization header to the request
 * with a JWT "token" retrieved from sessionStorage.
 * @param timeoutInSeconds The number of seconds to wait before timing out
 */
export const axiosWithAuth = ({
  timeoutInSeconds = 0,
}: AxiosGeneratorProps = {}): AxiosInstance => {
  const Authorization = sessionStorage.getItem('token') || '';
  return axios.create({
    baseURL,
    headers: { Authorization },
    timeout: timeoutInSeconds * 1000,
  });
};
/**
 * @title axiosWithoutAuth
 * @description This is a utility function that returns an axios instance
 * with the baseURL set to the REACT_APP_API_URL value found in the .env file
 * (defaults to localhost:8000), and the timeout set to the timeoutInSeconds
 * parameter. This function does not attach the Authorization header to the
 * request.
 * @param timeoutInSeconds The number of seconds to wait before timing out
 */
export const axiosWithoutAuth = ({
  timeoutInSeconds = 0,
}: AxiosGeneratorProps = {}): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: timeoutInSeconds * 1000,
  });
};
