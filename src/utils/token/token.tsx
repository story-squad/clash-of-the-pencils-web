import jwt_decode from 'jwt-decode';

/**
 * If a key is set in the ENV, it will use that as the localStorage
 * key for the token, otherwise it will be stored as `token: ''`
 */
const tokenName: string = process.env.TOKEN_KEY || 'token';

/**
 * Decodes the token and checks if you're still logged in before continuing.
 * If the token has expired or there is no token, the token is cleared and
 * you're sent back to the landing page.
 */
type flags = 'userId' | 'userEmail' | null;
export const get = (flag: flags = null): string | number | null => {
  // Read the token in from localStorage
  const token = localStorage.getItem(tokenName);
  // If it's empty, return null
  if (!token) return null;

  try {
    // jwt_decode will throw an error if the token is invalid
    const decodedToken: DecodedToken = jwt_decode(token);
    // If the token is expired, we will also throw an error
    if (Date.now() >= decodedToken.exp * 1000) throw new Error();

    // If a flag is specified, return the correct data
    if (flag === 'userId') return decodedToken.id;
    if (flag === 'userEmail') return decodedToken.username;

    // Otherwise, we return the token
    return token;
  } catch (err) {
    // If we hit an error at any point, the token will be cleared
    // and this function will return null
    clear();
    return null;
  }
};

/**
 * This function stores a token in localStorage
 * @param token taks a token as the argument and stores it in localStorage
 */
export const set = (token: string): void =>
  localStorage.setItem(tokenName, token);

/**
 * Clears the current token stored in localStorage
 */
export const clear = (): void => localStorage.removeItem(tokenName);

/**
 * An interface defining what the DecodedToken looks like
 */
export interface DecodedToken {
  exp: number;
  iat: number;
  id: number;
  username: string;
}
