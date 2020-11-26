import React, { useEffect } from 'react';

import { Prompts } from '../../../../api';
import { time } from '../../../../utils';

import { useRecoilState } from 'recoil';
import { prompts } from '../../../../state';

import RenderPromptBox from './RenderPromptBox';
import SubmissionsClosed from './SubmissionsClosed';

const PromptBoxContainer = (): React.ReactElement => {
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);
  const { active } = time.getTimeUntilEvent('submit');

  useEffect(() => {
    if (active && !prompt) {
      Prompts.getCurrent()
        .then(({ data }) => {
          setPrompt(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return active ? <RenderPromptBox /> : <SubmissionsClosed />;
};

export default PromptBoxContainer;
