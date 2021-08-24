import React, { useMemo } from 'react';
import { Toggle } from '../../atoms';
import { ToggleOption } from '../../atoms/Toggle';
import { Table } from '../../molecules';
import './styles/index.scss';

export interface ILeaderboardProps {
  dailyIsOpen: boolean;
  daily: React.ReactNode[][];
  weekly: React.ReactNode[][];

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
  const headings = useMemo(() => [<>&#127942;</>, 'Codename', 'Points'], []);

  const toggleOptions = useMemo<ToggleOption[]>(
    () => [
      {
        text: 'Daily',
        onSelect: openDaily,
      },
      {
        text: 'Weekly',
        onSelect: openWeekly,
      },
    ],
    [],
  );

  return (
    <section className="leaderboard">
      <Toggle
        leftIsSelected={dailyIsOpen}
        options={toggleOptions}
        toggle={toggleLeaderboard}
      />
      <Table headings={headings} rows={rows} />
    </section>
  );
}
