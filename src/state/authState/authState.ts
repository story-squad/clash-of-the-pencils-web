import { atom, DefaultValue, selector } from 'recoil';
import { Auth, Users } from '../../api';
import { getAge, token } from '../../utils';
import { all } from '../clearState';
import { persist } from '../effects';

export const user = atom<Users.IUser | undefined>({
  key: 'userAtom',
  default: undefined,
  effects_UNSTABLE: [persist('logged:in:user')],
});

export const authToken = atom<string | undefined>({
  key: 'tokenAtom',
  default: undefined,
  effects_UNSTABLE: [persist(token.STORAGE_KEY, { asString: true })],
});

/**
 * Use this to get a user's login information, pass in a login
 * response from the api to log the user in, or pass in undefined
 * to log them out.
 */
export const login = selector<Auth.IAuthResponse | void>({
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
      set(all, undefined);
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

export const userIsUnderage = selector<boolean>({
  key: 'userIsUnderageSelector',
  get: ({ get }) => {
    const u = get(user);
    if (!u) return false;
    else return getAge(u.dob) < 13;
  },
});
