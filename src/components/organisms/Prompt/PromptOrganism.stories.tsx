import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { promptData } from '../../../data';
import { time } from '../../../utils';
import PromptOrganism, { IPromptOrganismProps } from './PromptOrganism';

const Template: Story<IPromptOrganismProps> = ({
  prompt = promptData[7],
  ...props
}) => <PromptOrganism prompt={prompt} {...props} />;

export const Default = Template.bind({});
Default.args = { now: time.schedule.submit.start };

export default {
  title: 'Components/Organisms/Prompt',
  component: PromptOrganism,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as Meta;
