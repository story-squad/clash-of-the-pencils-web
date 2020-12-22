import React from 'react';
import { Submissions } from '../../../api';

const Scoreboard = (props: ScoreboardProps): React.ReactElement => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-header-row">
        <div className="scoreboard-header">Placement</div>
        <div className="scoreboard-header">Codename</div>
        <div className="scoreboard-header">Score</div>
      </div>
      <div className="scoreboard-body">
        {props.rows.map((r, i) => (
          <ScoreboardRow {...r} placement={i + 1} key={i} />
        ))}
      </div>
    </div>
  );
};

const ScoreboardRow = (props: ScoreboardRowProps): React.ReactElement => {
  return (
    <div className="scoreboard-row">
      <div className="row-col placement">{props.placement}</div>
      <div className="row-col username">{props.username}</div>
      <div className="row-col score">{props.score}</div>
    </div>
  );
};

interface ScoreboardProps {
  rows: Submissions.ScoreboardItem[];
}

interface ScoreboardRowProps extends Submissions.ScoreboardItem {
  placement: number;
}

export default Scoreboard;
