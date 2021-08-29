import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Prompts } from '../../../api';
import { leaderboard, prompts } from '../../../state';
import SubmissionView, { ISubmissionViewProps } from './SubmissionView';

const defaultPrompt: Prompts.IPrompt = {
  active: true,
  approved: true,
  id: 1,
  prompt:
    "Write about someone who's trying to accomplish a task that used to be easy but is not made complicated by a pandemic.",
};

const Template: Story<ISubmissionViewProps> = (props) => {
  return <SubmissionView {...props} />;
};

export const Default = Template.bind({});

export default {
  title: 'Views/SubmissionPhase',
  component: SubmissionView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => {
      const { daily, weekly } = getDisplayData();
      return (
        <RecoilRoot
          initializeState={(x) => {
            x.set(prompts.currentPrompt, defaultPrompt);
            x.set(leaderboard.daily, daily);
            x.set(leaderboard.weekly, weekly);
          }}
        >
          <BrowserRouter>{story()}</BrowserRouter>
        </RecoilRoot>
      );
    },
  ],
} as Meta;

function getDisplayData() {
  return {
    daily: [
      [1, 'Joanne', 100],
      [2, 'Tom', 80],
      [3, 'Victor', 65],
      [4, 'Ava', 50],
    ],
    weekly: [
      [1, 'Joanne', 100],
      [2, 'Joanne', 80],
      [3, 'Joanne', 65],
      [4, 'Joanne', 50],
    ],
  };
}
