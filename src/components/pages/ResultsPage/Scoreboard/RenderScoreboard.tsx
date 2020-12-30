import React from 'react';
import { Submissions } from '../../../../api';
import { Table } from '../../../common';

const RenderScoreboard = ({
  scoreboard,
}: RenderScoreboardProps): React.ReactElement => {
  return (
    <div className="scoreboard">
      <h3>Leaderboard</h3>
      <Table headings={Submissions.ScoreboardHeadings} rows={scoreboard} />
    </div>
  );
};

interface RenderScoreboardProps {
  scoreboard: Submissions.ProcessedScoreboardItem[];
}

export default RenderScoreboard;
