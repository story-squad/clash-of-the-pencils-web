export interface ScoreboardItem {
  username: string;
  score: number;
}

export const ScoreboardHeadings = [
  { display: 'Placement', propName: 'placement' },
  { display: 'Codename', propName: 'username' },
  { display: 'Score', propName: 'score' },
];

export const TestScoreboardData = [
  { placement: 1, username: 'User1', score: 40 },
  { placement: 2, username: 'User2', score: 41 },
  { placement: 3, username: 'User3', score: 42 },
];
