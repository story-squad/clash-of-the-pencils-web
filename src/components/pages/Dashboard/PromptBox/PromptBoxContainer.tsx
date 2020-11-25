import React, { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { prompts, user } from '../../../../state';

import { Prompts } from '../../../../api';

import { Countdown } from '../../../common';
import RenderPromptBox from './RenderPromptBox';

const PromptBoxContainer = (
  props: Countdown.CountdownComponentProps,
): React.ReactElement => {
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);

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

  return props.active ? (
    <RenderPromptBox {...props} />
  ) : (
    <NoSubmissionsBox {...props} />
  );
};

const NoSubmissionsBox = ({
  DisplayCountdown,
}: Countdown.CountdownComponentProps): React.ReactElement => {
  const username = useRecoilValue(user.username);
  return (
    <div className="prompt-box inactive">
      <h2>Hey, {username}</h2>
      <h3>Submissions are closed!</h3>
      <p>
        Check back in <DisplayCountdown /> for a new prompt!
      </p>
    </div>
  );
};

export default Countdown.wrapper('submit')(PromptBoxContainer);
