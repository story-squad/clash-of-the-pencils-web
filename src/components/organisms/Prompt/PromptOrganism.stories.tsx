import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Prompts } from '../../../api';
import PromptOrganism, { IPromptOrganismProps } from './PromptOrganism';

const defaultPrompt: Prompts.IPrompt = {
  active: true,
  approved: true,
  id: 1,
  prompt:
    "Write about someone who's trying to accomplish a task that used to be easy but is now made complicated by a pandemic.",
};

const Template: Story<IPromptOrganismProps> = ({ prompt = defaultPrompt }) => (
  <PromptOrganism prompt={prompt} />
);

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Prompt',
  component: PromptOrganism,
  parameters: { layout: 'fullscreen' },
} as Meta;
