import React from 'react';
import { useRecoilValue } from 'recoil';
import { nav } from '../../../config';
import { results } from '../../../state';
import { Header, SubCard } from '../../common';
import { ThoughtBubble } from '../../common/ThoughtBubble';

import dragonBoi from '../../../assets/dragon-boi.svg';

const RenderResultsPage = (): React.ReactElement => {
  const winner = useRecoilValue(results.winner);

  return (
    <div>
      <Header menuItems={nav.siteNavItems} />
      {winner && (
        <div className="results-page">
          <div className="celebration">
            <ThoughtBubble
              render={() => <WinnerBubble winnerName={winner.username} />}
            />
            <div className="bottom">
              <div className="dragon">
                <img src={dragonBoi} alt="1st place dragon" />
              </div>
              <div className="sub">
                <SubCard {...winner} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WinnerBubble = (props: WinnerBubbleProps): React.ReactElement => {
  return (
    <div className="winner-bubble">
      <h3>Today We Celebrate:</h3>
      <h2>{props.winnerName}</h2>
      <div className="flames">FLAMES GO HERE</div>
    </div>
  );
};

interface WinnerBubbleProps {
  winnerName: string;
}

export default RenderResultsPage;
