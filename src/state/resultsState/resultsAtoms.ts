import { atom } from 'recoil';
import { Submissions } from '../../api';

export const winner = atom<null | Submissions.ISubItem>({
  key: 'winningStory',
  default: null,
});

// const scoreboardTestData: Submissions.ProcessedScoreboardItem[] = [
//   { placement: 1, username: 'User1', score: 40 },
//   { placement: 2, username: 'User2', score: 41 },
//   { placement: 3, username: 'User3', score: 42 },
// ];

export const scoreboard = atom<null | Submissions.ILeaderboardItem[]>({
  key: 'scoreboard',
  default: null,
});
