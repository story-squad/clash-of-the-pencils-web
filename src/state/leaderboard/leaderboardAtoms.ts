import { atom } from 'recoil';

export const dailyIsOpen = atom<boolean>({
  key: 'dailyLeaderboardIsOpen',
  default: true,
});

export const daily = atom<unknown[]>({
  key: 'dailyLeaderboard',
  default: [],
});

export const weekly = atom<unknown[]>({
  key: 'weeklyLeaderboard',
  default: [],
});
