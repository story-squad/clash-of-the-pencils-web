import React from 'react';
import { Submissions } from '../../../../api';
import dragonBoiPNG from '../../../../assets/img/PNGs/first-place-dragon.png';
import dragonBoiWEBP from '../../../../assets/img/WebPs/first-place-dragon.webp';
import { Image, SubCard, ThoughtBubble } from '../../../common';
import WinnerBubble from './WinnerBubble';

const RenderCelebration = ({
  winner,
}: RenderCelebrationProps): React.ReactElement => {
  return (
    <div className="celebration">
      <ThoughtBubble
        render={() => <WinnerBubble winnerName={winner.username} />}
      />
      <div className="bottom">
        <div className="dragon">
          <Image
            webp={dragonBoiWEBP}
            src={dragonBoiPNG}
            alt="1st place dragon"
          />
        </div>
        <SubCard {...winner} />
      </div>
    </div>
  );
};

interface RenderCelebrationProps {
  winner: Submissions.SubItem;
}
export default RenderCelebration;
