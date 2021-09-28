import { atom, selector } from 'recoil';
import { Submissions } from '../../api';

export const dailyIsOpen = atom<boolean>({
  key: 'dailyLeaderboardIsOpen',
  default: true,
});

export const daily = atom<Submissions.ILeaderboardItem[]>({
  key: 'dailyLeaderboard',
  default: selector({
    key: 'dailyLeaderboardDefaultSelector',
    get: Submissions.getDailyLeaderboard,
  }),
});

export const weekly = atom<Submissions.ILeaderboardItem[]>({
  key: 'weeklyLeaderboard',
  default: selector({
    key: 'weeklyLeaderboardDefaultSelector',
    get: Submissions.getWeeklyLeaderboard,
  }),
});
