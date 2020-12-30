import React from 'react';

const WinnerBubble = (props: WinnerBubbleProps): React.ReactElement => {
  return (
    <div className="winner-bubble">
      <h3>Current Winner:</h3>
      <h2>{props.winnerName}</h2>
      <div className="flames">&#128293; &#128293; &#128293;</div>
    </div>
  );
};

interface WinnerBubbleProps {
  winnerName: string;
}

export default WinnerBubble;
