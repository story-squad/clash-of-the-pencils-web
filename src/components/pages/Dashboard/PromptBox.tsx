import React from 'react';

const PromptBox = (props: PromptBoxProps): React.ReactElement => {
  return (
    <div className="prompt-box">
      <h2>Hey, {props.username}!</h2>
      <h3>Here is today&apos;s prompt:</h3>
      <p>{props.prompt}</p>
      <div className="prompt-footer">
        {/* <div className="streak">
          <h3>Hot Streak:</h3>
          <span className="flames">
            {[...new Array(props.streak)].map(() => '(f)')}
          </span>
        </div> */}
        <button>Submit Your Story</button>
      </div>
    </div>
  );
};

interface PromptBoxProps {
  username: string;
  prompt: string;
  streak: number;
}

export default PromptBox;
