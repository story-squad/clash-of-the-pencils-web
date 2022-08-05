import axios, { AxiosInstance } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// Attempts to read the API URL from your ENV, falls back to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface AxiosGeneratorProps {
  timeoutInSeconds?: number;
}

const auth0Config: {
  audience: string | undefined;
  domain: string | undefined;
} = {
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

/**
 * @title getAccessToken
 * @description Calls the Auth0 getAccessTokenSilently method to retrieve the access token from Auth0 to attach to the request header (Authorization: Bearer + AccessToken) for use with protected API routes
 * @param auth0Config - Auth0 config object: { audience, domain }
 * @returns Auth0 access token
 */

async function getAccessToken(): Promise<string | unknown> {
  try {
    const accessToken = await useAuth0().getAccessTokenSilently(auth0Config);
    return accessToken;
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.message === 'login_required' || e.message === 'consent_required') {
        useAuth0().loginWithRedirect();
      }
    } else {
      if (e instanceof Error) {
        throw e;
      }
    }
  }
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
