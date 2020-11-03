import { atom } from 'recoil';

// Type definition for our userState state object
export interface User {}

// Initial userState when app is launched
const initState: User = {};

export const userState: User = atom({
  key: 'userState',
  default: initState,
});
