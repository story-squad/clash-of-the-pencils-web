import React, { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { prompts, user } from '../../../../state';

import { Prompts } from '../../../../api';

import RenderPromptBox from './RenderPromptBox';

import { Countdown } from '../../../common';
import { useCountdown } from '../../../../hooks';

const PromptBoxContainer = (): React.ReactElement => {
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);
  const { active } = useCountdown('submit');

  useEffect(() => {
    if (!prompt) {
      Prompts.getCurrent()
        .then(({ data }) => {
          setPrompt(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return active ? <RenderPromptBox /> : <NoSubmissionsBox />;
};

const NoSubmissionsBox = (): React.ReactElement => {
  const { timeUntil } = useCountdown('submit');
  const username = useRecoilValue(user.username);

  return (
    <div className="prompt-box inactive">
      <h2>Hey, {username}</h2>
      <h3>Submissions are closed!</h3>
      <p>
        Check back in <Countdown timeUntil={timeUntil} /> for a new prompt!
      </p>
    </div>
  );
};

export default PromptBoxContainer;
