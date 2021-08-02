import React from 'react';
import { Submissions } from '../../../../api';
import dragonBoi from '../../../../assets/img/dragon-boi.svg';
import { SubCard, ThoughtBubble } from '../../../common';
import WinnerBubble from './WinnerBubble';

const RenderCelebration = ({
  winner,
}: RenderCelebrationProps): React.ReactElement => {
  return (
    <div className="celebration">
      <ThoughtBubble
        render={() => <WinnerBubble winnerName={winner.codename} />}
      />
      <div className="bottom">
        <div className="dragon">
          <img src={dragonBoi} alt="1st place dragon" />
        </div>
        <SubCard {...winner} />
      </div>
    </div>
  );
};

interface RenderCelebrationProps {
  winner: Submissions.ISubItem;
}
export default RenderCelebration;
