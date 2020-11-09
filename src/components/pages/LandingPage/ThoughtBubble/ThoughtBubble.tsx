import React from 'react';

const ThoughtBubble = (): React.ReactElement => {
  return (
    <div className="thought-bubble">
      <div className="text-bubble">
        Hello! Welcome to Story Squad! You can sign in, create an account, or
        learn more below!
      </div>
      <div className="thought-trail-1">
        <div className="bubble" />
      </div>
      <div className="thought-trail-2">
        <div className="bubble" />
      </div>
    </div>
  );
};

export default ThoughtBubble;
