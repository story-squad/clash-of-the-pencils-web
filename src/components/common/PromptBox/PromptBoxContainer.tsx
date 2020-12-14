import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Prompts } from '../../../api';
import { prompts } from '../../../state';
import { time } from '../../../utils';
import RenderPromptBox from './RenderPromptBox';
import SubmissionsClosed from './SubmissionsClosed';

const PromptBoxContainer = (): React.ReactElement => {
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);
  const { active } = time.getTimeUntilEvent('submit');

  useEffect(() => {
    if (active && !prompt) {
      Prompts.getCurrent()
        .then(({ data }) => {
          console.log(data);
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
