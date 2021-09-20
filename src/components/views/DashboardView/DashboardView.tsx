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
}

export default function DashboardView({
  phase,
}: DashboardViewProps): React.ReactElement {
  return (
    <DashboardTemplate>
      <FullscreenImageOverlay />
      <TwoColumn left={<Prompt phase={phase} />} right={<Leaderboard />} />
      <VotingOrganism phase={phase} />
    </DashboardTemplate>
  );
}
