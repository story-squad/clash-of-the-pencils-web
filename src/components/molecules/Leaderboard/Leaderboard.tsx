import React from 'react';

export interface ILeaderboardProps {
  dailyIsOpen: boolean;
  daily: unknown[];
  weekly: unknown[];

  openDaily: () => void;
  openWeekly: () => void;
  toggleLeaderboard: () => void;
}

export default function Leaderboard({
  dailyIsOpen,
  daily,
  weekly,
  openDaily,
  openWeekly,
  toggleLeaderboard,
}: ILeaderboardProps): React.ReactElement {
  return <section className="leaderboard"></section>;
}
