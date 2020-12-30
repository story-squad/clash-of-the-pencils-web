import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../../api';
import { results } from '../../../../state';
import CouldNotLoad from '../CouldNotLoad';
import RenderScoreboard from './RenderScoreboard';

const ScoreboardContainer = (): React.ReactElement => {
  const [scoreboard, setScoreboard] = useRecoilState(results.scoreboard);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!scoreboard) {
      Submissions.getScoreboard()
        .then((s) => {
          setScoreboard(s);
        })
        .catch((err) => {
          console.log({ err });
          setError('Could not load leaderboard');
        });
    }
  }, []);
  return scoreboard ? (
    <RenderScoreboard scoreboard={scoreboard} />
  ) : error ? (
    <CouldNotLoad className="scoreboard" error={error} />
  ) : (
    <div className="scoreboard loader">
      <p>Loading leaderboard...</p>
      <ScaleLoader />
    </div>
  );
};

export default ScoreboardContainer;
