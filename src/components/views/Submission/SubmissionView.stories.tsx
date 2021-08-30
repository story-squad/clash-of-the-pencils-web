import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { promptData } from '../../../data';
import leaderboardData from '../../../data/leaderboardData';
import { leaderboard, prompts } from '../../../state';
import SubmissionView, { ISubmissionViewProps } from './SubmissionView';

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
      const { daily, weekly } = leaderboardData;
      return (
        <RecoilRoot
          initializeState={(x) => {
            // We need to initialize recoil state here
            x.set(prompts.currentPrompt, promptData[7]);
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
