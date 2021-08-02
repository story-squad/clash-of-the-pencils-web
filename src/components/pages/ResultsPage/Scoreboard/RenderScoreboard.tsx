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
        <Table headings={ScoreboardHeadings} rows={scoreboard} />
      </div>
    </>
  );
};

const ScoreboardHeadings = [
  { display: 'Placement', propName: 'placement' },
  { display: 'Codename', propName: 'codename' },
  { display: 'Score', propName: 'score' },
];

interface RenderScoreboardProps {
  scoreboard: Submissions.ILeaderboardItem[];
}

export default RenderScoreboard;
