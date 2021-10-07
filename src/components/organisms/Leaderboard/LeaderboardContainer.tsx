import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { leaderboard } from '../../../state';
import { Loader } from '../../atoms';
import Leaderboard from './Leaderboard';

function LeaderboardContainer(): React.ReactElement {
  const daily = useRecoilValue(leaderboard.daily);
  const weekly = useRecoilValue(leaderboard.weekly);
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

export default function LeaderboardSuspenseWrapper(): React.ReactElement {
  return (
    <React.Suspense fallback={<Loader />}>
      <LeaderboardContainer />
    </React.Suspense>
  );
}
