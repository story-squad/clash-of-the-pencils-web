import { atom } from 'recoil';
import { Submissions } from '../../api';

export const winner = atom<null | Submissions.ISubItem>({
  key: 'winningStory',
  default: null,
});

export const scoreboard = atom<null | Submissions.ILeaderboardItem[]>({
  key: 'scoreboard',
  default: null,
});
