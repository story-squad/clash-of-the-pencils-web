import React from 'react';
import {
  Leaderboard,
  Prompt,
  StreamOrganism,
  TwoColumn,
  VotingOrganism,
} from '../../organisms';
import { DashboardTemplate } from '../../templates';
import { FullscreenImageOverlay } from '../FullscreenImageOverlay';

export interface DashboardViewProps {
  submitVotes?: () => Promise<unknown>;
}

export default function DashboardView({
  submitVotes,
}: DashboardViewProps): React.ReactElement {
  return (
    <DashboardTemplate>
      <FullscreenImageOverlay />
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
      <VotingOrganism submitVotes={submitVotes} />
      <StreamOrganism />
    </DashboardTemplate>
  );
}
