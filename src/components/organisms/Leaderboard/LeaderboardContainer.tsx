import React from 'react';
import { useRecoilState } from 'recoil';
import { leaderboardData } from '../../../data';
import { leaderboard } from '../../../state';
import Leaderboard from './Leaderboard';

export default function LeaderboardContainer(): React.ReactElement {
  // const daily = useRecoilValue(leaderboard.daily);
  // const weekly = useRecoilValue(leaderboard.weekly);
  const { daily, weekly } = leaderboardData;
  const [dailyIsOpen, setDailyIsOpen] = useRecoilState(leaderboard.dailyIsOpen);

  const toggleLeaderboard = () => setDailyIsOpen((is) => !is);

  return (
    <Leaderboard
      dailyIsOpen={dailyIsOpen}
      daily={daily}
      weekly={weekly}
      toggleLeaderboard={toggleLeaderboard}
    />
  );
}
