import { classnames } from '@story-squad/react-utils';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../api';
import { TUTORIAL_IDS } from '../../../config';
import { tutorial } from '../../../state';
import { Toggle, ToggleOption } from '../../atoms';
import { Table } from '../../molecules';
import LeaderboardIcon from './LeaderboardIcon';
import './styles/index.scss';

export interface ILeaderboardProps {
  dailyIsOpen: boolean;
  daily: Submissions.ILeaderboardItem[];
  weekly: Submissions.WeeklyLeaderboardItem[];
  toggleLeaderboard: () => void;
}

const TOGGLE_OPTS: ToggleOption[] = [{ text: 'Weekly' }, { text: 'Daily' }];

export default function Leaderboard({
  dailyIsOpen,
  daily,
  weekly,
  toggleLeaderboard,
}: ILeaderboardProps): React.ReactElement {
  const message = useRecoilValue(tutorial.currentMessage);

  const dailyItems = useMemo(
    () => daily.reduce(reduceDailyLeaderboardItemsToTableRows, []),
    [daily],
  );

  const weeklyItems = useMemo(
    () => weekly.reduce(reduceWeeklyLeaderboardItemsToTableRows, []),
    [weekly],
  );

  const rows = useMemo(
    () => (dailyIsOpen ? dailyItems : weeklyItems),
    [dailyItems, weeklyItems, dailyIsOpen],
  );

  const headings = useMemo(
    () => [
      <LeaderboardIcon key={0} icon="place" />,
      'Codename',
      'Points',
      ...(dailyIsOpen
        ? []
        : [
            <LeaderboardIcon key={3} icon="submitted" />,
            <LeaderboardIcon key={4} icon="voted" />,
          ]),
    ],
    [dailyIsOpen],
  );

  return (
    <section
      id={TUTORIAL_IDS.ID_LEADERBOARD}
      className={classnames(
        'leaderboard',
        message.id === TUTORIAL_IDS.ID_LEADERBOARD && 'active-tutorial',
      )}
    >
      <h1>Leaderboard</h1>
      <Toggle
        leftIsSelected={!dailyIsOpen}
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

function reduceDailyLeaderboardItemsToTableRows(
  accumulator: React.ReactNode[][],
  cur: Submissions.ILeaderboardItem,
): React.ReactNode[][] {
  return [...accumulator, [cur.rank, cur.codename, cur.score]];
}

function reduceWeeklyLeaderboardItemsToTableRows(
  accumulator: React.ReactNode[][],
  cur: Submissions.WeeklyLeaderboardItem,
): React.ReactNode[][] {
  return [
    ...accumulator,
    [cur.rank, cur.codename, cur.score, cur.timesSubmitted, cur.timesVoted],
  ];
}
