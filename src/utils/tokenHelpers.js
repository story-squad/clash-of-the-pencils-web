const tokenName = process.env.TOKEN_KEY || 'token';

export const getToken = () => localStorage.getItem(tokenName);
export const setToken = (token) => localStorage.setItem(tokenName, token);
export const clearToken = () => localStorage.removeItem(tokenName);
