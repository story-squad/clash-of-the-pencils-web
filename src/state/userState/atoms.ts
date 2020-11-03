import Recoil, { atom } from 'recoil';

// Type definition for our userState state object
export interface User {
  id: number;
}

// Initial userState when app is launched
const initState: User | object = {};

export const userState: Recoil.RecoilState<User | object> = atom({
  key: 'userState',
  default: initState,
});
