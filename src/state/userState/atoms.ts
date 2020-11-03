import Recoil, { atom } from 'recoil';

// Type definition for our userState state object
export interface User {
  // This is only here currently to pass checks on dev deployment
  // the User object typing will be defined at a later date
  id: number;
}

// Initial userState when app is launched
const initState: User | null = null;

export const userState: Recoil.RecoilState<User | null> = atom<User | null>({
  key: 'userState',
  default: initState,
});
