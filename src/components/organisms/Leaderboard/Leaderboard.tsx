import React, { useMemo } from 'react';
import { Submissions } from '../../../api';
import { Toggle, ToggleOption } from '../../atoms';
import { Table } from '../../molecules';
import './styles/index.scss';

export interface ILeaderboardProps {
  dailyIsOpen: boolean;
  daily: Submissions.ILeaderboardItem[];
  weekly: Submissions.ILeaderboardItem[];
  toggleLeaderboard: () => void;
}

const TOGGLE_OPTS: ToggleOption[] = [{ text: 'Daily' }, { text: 'Weekly' }];

export default function Leaderboard({
  dailyIsOpen,
  daily,
  weekly,
  toggleLeaderboard,
}: ILeaderboardProps): React.ReactElement {
  const dailyItems = useMemo(
    () => daily.reduce(reduceLeaderboardItemsToTableRows, []),
    [daily],
  );

  const weeklyItems = useMemo(
    () => weekly.reduce(reduceLeaderboardItemsToTableRows, []),
    [weekly],
  );

  const rows = useMemo(
    () => (dailyIsOpen ? dailyItems : weeklyItems),
    [dailyItems, weeklyItems, dailyIsOpen],
  );
  const headings = useMemo(() => [<>&#127942;</>, 'Codename', 'Points'], []);

  return (
    <section className="leaderboard">
      <h1>Leaderboard</h1>
      <Toggle
        leftIsSelected={dailyIsOpen}
        options={TOGGLE_OPTS}
        toggle={toggleLeaderboard}
      />
      <Table headings={headings} rows={rows} />
      {rows.length === 0 && (
        <div className="empty-leaderboard-message">
          <div className="empty-leaderboard-message-container">
            <h2>Leaderboard is currently empty</h2>
            <p>Submit a story and try to make it to the top!</p>
          </div>
        </div>
      )}
    </section>
  );
}

function reduceLeaderboardItemsToTableRows(
  accumulator: React.ReactNode[][],
  cur: Submissions.ILeaderboardItem,
): React.ReactNode[][] {
  return [...accumulator, [cur.rank, cur.codename, cur.score]];
}
