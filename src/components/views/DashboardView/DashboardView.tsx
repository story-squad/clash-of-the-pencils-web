import React from 'react';
import { time } from '../../../utils';
import {
  Leaderboard,
  Prompt,
  TwoColumn,
  VotingOrganism,
} from '../../organisms';
import { DashboardTemplate } from '../../templates';
import { FullscreenImageOverlay } from '../FullscreenImageOverlay';

export interface DashboardViewProps {
  phase: Exclude<time.eventType, 'off'>;
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
    </DashboardTemplate>
  );
}
