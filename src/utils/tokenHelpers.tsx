import jwt_decode from 'jwt-decode';

const tokenName: string = process.env.TOKEN_KEY || 'token';
export interface DecodedToken {
  exp: number;
  iat: number;
  id: number;
  username: string;
}

/**
 * Decodes the token and checks if you're still logged in before continuing.
 * If the token has expired or tehre is no token, the token is cleared and
 * you're sent back to the landing page.
 */
export const getToken = (): string | null => {
  const token = localStorage.getItem(tokenName);
  if (!token) return null;

  try {
    const decodedToken: DecodedToken = jwt_decode(token);
    if (Date.now() >= decodedToken.exp * 1000) throw new Error();
    return token;
  } catch (err) {
    clearToken();
    return null;
  }
};
export const setToken = (token: string): void =>
  localStorage.setItem(tokenName, token);
export const clearToken = (): void => localStorage.removeItem(tokenName);
