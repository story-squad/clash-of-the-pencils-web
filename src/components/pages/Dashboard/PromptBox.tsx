import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Prompts } from '../../../api';
import { prompts, user } from '../../../state';

const PromptBox = (): React.ReactElement => {
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);
  const username = useRecoilValue(user.username);

  useEffect(() => {
    if (!prompt)
      Prompts.getCurrent()
        .then(({ data }) => {
          setPrompt(data.prompt);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <div className="prompt-box">
      <h2>Hey, {username}!</h2>
      {prompt ? (
        <>
          <h3>Here is today&apos;s prompt:</h3>
          <p>{prompt.prompt}</p>
        </>
      ) : (
        <p>Loading prompt...</p>
      )}
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

export default PromptBox;
