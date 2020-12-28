import moment from 'moment';
import React from 'react';
import { useRecoilValue } from 'recoil';
import celebration from '../../../assets/img/celebration-station.png';
import dragonBoi from '../../../assets/img/dragon-boi.svg';
import { results } from '../../../state';
import { time } from '../../../utils';
import { Header, SubCard, ThoughtBubble } from '../../common';

const RenderResultsPage = (): React.ReactElement => {
  const winner = useRecoilValue(results.winner);
  // const winner = {
  //   id: 1,
  //   image: '123432452342',
  //   src:
  //     'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/landscaping-ideas-1582321830.jpg',
  //   userId: 5,
  //   username: 'A Username',
  //   rotation: 0,
  // };

  return (
    <div>
      <Header />
      <div className="results-page">
        <img src={celebration} alt="Celebration Station" />
        {winner ? (
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
        ) : (
          <div className="could-not-load">
            <div className="message">Results not available &#128557;</div>
            <p>Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const WinnerBubble = (props: WinnerBubbleProps): React.ReactElement => {
  const now = moment();
  return (
    <div className="winner-bubble">
      <h3>
        {now < time.schedule.announce.start ? "Yesterday's" : "Today's"} Winner:
      </h3>
      <h2>{props.winnerName}</h2>
      <div className="flames">&#128293; &#128293; &#128293;</div>
    </div>
  );
};

interface WinnerBubbleProps {
  winnerName: string;
}

export default RenderResultsPage;
