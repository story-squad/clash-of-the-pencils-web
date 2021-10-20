import React from 'react';
import { SubmissionCard } from '../../molecules';
import { Leaderboard, TwoColumn } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import { FullscreenImageOverlay } from '../FullscreenImageOverlay';

export interface WinnersViewProps {
  winnerIds: number[];
}

export default function WinnersView({
  winnerIds: [winnerId, ...winnerIds],
}: WinnersViewProps): React.ReactElement {
  console.log({ winnerId, winnerIds });
  return (
    <DashboardTemplate>
      <FullscreenImageOverlay />
      <TwoColumn
        left={<BigWinner winnerId={winnerId} />}
        right={<Leaderboard />}
      />
    </DashboardTemplate>
  );
}

function BigWinner({ winnerId }: { winnerId: number }): React.ReactElement {
  return (
    <div className="big-winner">
      <SubmissionCard droppable={false} submissionId={winnerId} />
    </div>
  );
}
