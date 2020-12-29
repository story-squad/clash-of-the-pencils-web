import moment from 'moment';
import React from 'react';
import { time } from '../../../../utils';

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

export default WinnerBubble;
