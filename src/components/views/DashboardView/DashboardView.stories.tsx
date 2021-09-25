import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { leaderboardData, promptData, submissionData } from '../../../data';
import { leaderboard, prompts, top3 } from '../../../state';
import { sleep } from '../../../utils';
import DashboardView, { DashboardViewProps } from './DashboardView';

const Template: Story<DashboardViewProps> = ({ submitVotes, ...props }) => {
  const submitHandler = useCallback(
    submitVotes ??
      (async () => {
        await sleep(2000);
      }),
    [submitVotes, sleep],
  );
  return <DashboardView submitVotes={submitHandler} {...props} />;
};

export const VotingPhase = Template.bind({});

export const SubmissionPhase = Template.bind({});

export const AdminPhase = Template.bind({});

export const StreamPhase = Template.bind({});

export default {
  title: 'Views/DashboardView',
  component: DashboardView,
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
          }}
        >
          <BrowserRouter>{story()}</BrowserRouter>
        </RecoilRoot>
      );
    },
  ],
} as Meta;
