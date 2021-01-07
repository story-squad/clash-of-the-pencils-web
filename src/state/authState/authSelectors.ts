import { selector } from 'recoil';
import { token } from '../../utils';
import { email, loginToken, userId, username } from './authAtoms';

export const isLoggedIn = selector<string | null>({
  key: 'loginSelector',
  get: ({ get }) => {
    return get(loginToken);
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'string') token.set(newValue);
    const t = token.get();
    if (t) {
      console.log('logging in...');
      // We can coerce types because we know the token exists and is valid
      set(loginToken, t as string);
      set(userId, token.get('userId') as number);
      set(username, token.get('username') as string);
      set(email, token.get('userEmail') as string);
    } else {
      console.log('no token found');
    }
  },
});
