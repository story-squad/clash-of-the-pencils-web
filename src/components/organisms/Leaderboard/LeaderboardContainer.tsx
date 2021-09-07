import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { leaderboard } from '../../../state';
import Leaderboard from './Leaderboard';

export default function LeaderboardContainer(): React.ReactElement {
  const daily = useRecoilValue(leaderboard.daily);
  const weekly = useRecoilValue(leaderboard.weekly);
  const [dailyIsOpen, setDailyIsOpen] = useRecoilState(leaderboard.dailyIsOpen);

  const toggleLeaderboard = () => setDailyIsOpen((is) => !is);

  return (
    <Leaderboard
      dailyIsOpen={dailyIsOpen}
      daily={[]}
      weekly={[]}
      toggleLeaderboard={toggleLeaderboard}
    />
  );
}
