import React from 'react';
import { Leaderboard, Prompt, TwoColumn } from '../../organisms';
import { DashboardTemplate } from '../../templates';

export default function SubmissionView(): React.ReactElement {
  return (
    <DashboardTemplate>
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
    </DashboardTemplate>
  );
}
