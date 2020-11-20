import React from 'react';

const ThoughtBubble = ({
  render: Component = null,
}: ThoughtBubbleProps): React.ReactElement => {
  return (
    <div className="thought-bubble">
      <div className="text-bubble">
        {Component ? (
          <Component />
        ) : (
          <div>
            Hello! Welcome to Story Squad! You can sign in, create an account,
            or learn more below!
          </div>
        )}
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

interface ThoughtBubbleProps {
  render?: React.ComponentType | null;
}

export default ThoughtBubble;
