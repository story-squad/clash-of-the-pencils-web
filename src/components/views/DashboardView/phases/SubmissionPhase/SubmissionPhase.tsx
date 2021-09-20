import React from 'react';
import {
  Leaderboard,
  Prompt,
  TwoColumn,
  VotingOrganism,
} from '../../../../organisms';
import { DashboardTemplate } from '../../../../templates';
import { FullscreenImageOverlay } from '../../../FullscreenImageOverlay';

export default function SubmissionPhase(): React.ReactElement {
  return (
    <DashboardTemplate>
      <FullscreenImageOverlay />
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
      <VotingOrganism phase="submit" />
    </DashboardTemplate>
  );
}
