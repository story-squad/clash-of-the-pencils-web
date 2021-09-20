import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  leaderboardData,
  promptData,
  submissionData,
} from '../../../../../data';
import { app, leaderboard, prompts, top3 } from '../../../../../state';
import { schedule } from '../../../../../utils/time';
import SubmissionPhase from './SubmissionPhase';

const Template: Story = (props) => {
  return <SubmissionPhase {...props} />;
};

export const Default = Template.bind({});

export default {
  title: 'Views/SubmissionPhase',
  component: SubmissionPhase,
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
            set(top3.top3List, submissionData.slice(0, 3));
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
