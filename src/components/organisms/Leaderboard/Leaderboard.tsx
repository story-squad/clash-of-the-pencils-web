import React, { useMemo } from 'react';
import { Table } from '../../molecules';

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
  const rows = useMemo(
    () => (dailyIsOpen ? daily : weekly),
    [dailyIsOpen, daily, weekly],
  );
  const cols = useMemo(() => [], []);
  return (
    <section className="leaderboard">
      {/* TOGGLER GOES HERE */}
      <Table cols={cols} rows={rows} />
    </section>
  );
}
