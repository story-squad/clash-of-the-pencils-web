import React from 'react';
import {
  Leaderboard,
  Prompt,
  TwoColumn,
  VotingOrganism,
} from '../../organisms';
import { DashboardTemplate } from '../../templates';

export default function SubmissionView(): React.ReactElement {
  return (
    <DashboardTemplate>
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
      <VotingOrganism phase="submit" />
    </DashboardTemplate>
  );
}
