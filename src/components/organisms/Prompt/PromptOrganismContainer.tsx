import React from 'react';
import { useRecoilValue } from 'recoil';
import { app, prompts } from '../../../state';
import { Loader } from '../../molecules';
import PromptOrganism from './PromptOrganism';

export default function PromptOrganismContainer(): React.ReactElement {
  const prompt = useRecoilValue(prompts.currentPrompt);
  const now = useRecoilValue(app.now);
  return prompt ? <PromptOrganism prompt={prompt} now={now} /> : <Loader />;
}
