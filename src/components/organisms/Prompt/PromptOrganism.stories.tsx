import { Meta, Story } from '@storybook/react';
import React from 'react';
import { promptData } from '../../../data';
import PromptOrganism, { IPromptOrganismProps } from './PromptOrganism';

const Template: Story<IPromptOrganismProps> = ({
  prompt = promptData[7],
  ...props
}) => <PromptOrganism prompt={prompt} {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Prompt',
  component: PromptOrganism,
  parameters: { layout: 'fullscreen' },
} as Meta;
