import React from 'react';
import { Submissions } from '../../../../api';
import { tooltips } from '../../../../config';
import { InfoHoverTip, Table } from '../../../common';

const RenderScoreboard = ({
  scoreboard,
}: RenderScoreboardProps): React.ReactElement => {
  return (
    <>
      <div className="scoreboard">
        <InfoHoverTip tip={tooltips.scoreboardInstructions} position="left" />
        <h3>Weekly Leaderboard</h3>
        <Table headings={Submissions.ScoreboardHeadings} rows={scoreboard} />
      </div>
    </>
  );
};

interface RenderScoreboardProps {
  scoreboard: Submissions.ProcessedScoreboardItem[];
}

export default RenderScoreboard;
