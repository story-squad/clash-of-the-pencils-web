const tokenName: string = process.env.TOKEN_KEY || 'token';

export const getToken = (): string | null => localStorage.getItem(tokenName);
export const setToken = (token: string): void =>
  localStorage.setItem(tokenName, token);
export const clearToken = (): void => localStorage.removeItem(tokenName);
