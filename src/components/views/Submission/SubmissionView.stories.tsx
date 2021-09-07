import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { promptData } from '../../../data';
import leaderboardData from '../../../data/leaderboardData';
import { app, leaderboard, prompts } from '../../../state';
import { schedule } from '../../../utils/time';
import SubmissionView from './SubmissionView';

const Template: Story = (props) => {
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
          initializeState={({ set }) => {
            // We need to initialize recoil state here
            set(prompts.currentPrompt, promptData[7]);
            set(leaderboard.daily, daily);
            set(leaderboard.weekly, weekly);
            set(
              app.now,
              schedule.submit.end.minus({
                hours: 12,
                minutes: 34,
                seconds: 56,
              }),
            );
          }}
        >
          <BrowserRouter>{story()}</BrowserRouter>
        </RecoilRoot>
      );
    },
  ],
} as Meta;
