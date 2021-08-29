import React from 'react';
import { useRecoilValue } from 'recoil';
import { prompts } from '../../../state';
import { Loader } from '../../common';
import PromptOrganism from './PromptOrganism';

export default function PromptOrganismContainer(): React.ReactElement {
  const prompt = useRecoilValue(prompts.currentPrompt);
  return prompt ? <PromptOrganism prompt={prompt} /> : <Loader />;
}
