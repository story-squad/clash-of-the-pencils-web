import { atom, DefaultValue, selector } from 'recoil';
import { Auth, Users } from '../../api';
import { token } from '../../utils';
import { persist } from '../effects';

export const user = atom<Omit<Users.IUser, 'password'> | undefined>({
  key: 'userAtom',
  default: undefined,
  effects_UNSTABLE: [persist('logged:in:user', { asString: true })],
});

export const authToken = atom<string | undefined>({
  key: 'tokenAtom',
  default: undefined,
  effects_UNSTABLE: [persist(token.STORAGE_KEY)],
});

/**
 * Use this to get a user's login information, pass in a login
 * response from the api to log the user in, or pass in undefined
 * to log them out.
 */
export const login = selector<Auth.IAuthResponse | undefined>({
  key: 'loginAuthSelector',
  get: ({ get }) => {
    const u = get(user);
    const t = get(authToken);
    if (u && t) return { user: u, token: t };
    else return undefined;
  },
  set: ({ set }, authResponse) => {
    if (authResponse instanceof DefaultValue) {
      return undefined;
    } else if (authResponse === undefined) {
      set(authToken, undefined);
      set(user, undefined);
    } else {
      // This persists in localStorage automatically because of our effect
      set(authToken, authResponse.token);

      set(user, authResponse.user);
    }
  },
});

export const isLoggedIn = selector<boolean>({
  key: 'isLoggedInSelector',
  get: ({ get }) => {
    const u = get(user);
    const t = get(authToken);
    return u !== undefined && t !== undefined;
  },
});
