export interface ScoreboardItem {
  username: string;
  score: number;
}

export const ScoreboardHeadings = [
  { display: 'Placement', propName: 'placement' },
  { display: 'Codename', propName: 'username' },
  { display: 'Score', propName: 'score' },
];

const preprocessedData = [
  { username: 'User1', score: 40 },
  { username: 'User2', score: 41 },
  { username: 'User3', score: 42 },
];

export const TestScoreboardData = preprocessedData.map((d, i) => ({
  ...d,
  placement: i + 1,
}));
