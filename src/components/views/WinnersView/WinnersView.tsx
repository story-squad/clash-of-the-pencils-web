import React from 'react';
import { SubmissionCard } from '../../molecules';
import { CardList, Leaderboard, TwoColumn } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import { FullscreenImageOverlay } from '../FullscreenImageOverlay';
import './styles/index.scss';

export interface WinnersViewProps {
  winnerIds: number[];
}

export default function WinnersView({
  winnerIds: [winnerId, ...winnerIds],
}: WinnersViewProps): React.ReactElement {
  return (
    <DashboardTemplate className="winners-dashboard">
      <FullscreenImageOverlay />
      <TwoColumn
        className="winners-two-col"
        left={<BigWinner winnerId={winnerId} />}
        right={<Leaderboard />}
      />
      <CardList className="winners-submission-card-list">
        {winnerIds.map((id) => (
          <SubmissionCard key={id} droppable={false} submissionId={id} />
        ))}
      </CardList>
    </DashboardTemplate>
  );
}

function BigWinner({ winnerId }: { winnerId: number }): React.ReactElement {
  return (
    <div className="big-winner">
      <h2>Latest Champion</h2>
      <SubmissionCard droppable={false} submissionId={winnerId} />
    </div>
  );
}
