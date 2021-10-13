import { atom, selector } from 'recoil';
import { Submissions } from '../../api';
import { persist } from '../effects';

export const dailyIsOpen = atom<boolean>({
  key: 'dailyLeaderboardIsOpen',
  default: true,
  effects_UNSTABLE: [persist('lb:open:state')],
});

export const daily = atom<Submissions.ILeaderboardItem[]>({
  key: 'dailyLeaderboard',
  default: selector({
    key: 'dailyLeaderboardDefaultSelector',
    get: () => Submissions.getDailyLeaderboard(),
  }),
});

export const weekly = atom<Submissions.WeeklyLeaderboardItem[]>({
  key: 'weeklyLeaderboard',
  default: selector({
    key: 'weeklyLeaderboardDefaultSelector',
    get: () => Submissions.getWeeklyLeaderboard(),
  }),
});
