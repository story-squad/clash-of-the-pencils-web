import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../api';
import { results } from '../../../state';
import { Table } from '../../common';
import CouldNotLoad from './CouldNotLoad';

const Scoreboard = (): React.ReactElement => {
  const scoreboardRows = useRecoilValue(results.scoreboard);
  return scoreboardRows ? (
    <div className="scoreboard">
      <h3>Leaderboard</h3>
      <Table headings={Submissions.ScoreboardHeadings} rows={scoreboardRows} />
    </div>
  ) : (
    <CouldNotLoad />
  );
};

export default Scoreboard;
