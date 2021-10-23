import React from 'react';
import { FullscreenImageOverlay } from '../../modals';
import { SubmissionCard } from '../../molecules';
import { CardList, Leaderboard, TwoColumn } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import BigWinner from './BigWinner';
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
      <div className="past-winners-list">
        <h2>Previous Winners</h2>
        <CardList className="winners-submission-card-list">
          {winnerIds.map((id) => (
            <SubmissionCard key={id} droppable={false} submissionId={id} />
          ))}
        </CardList>
      </div>
    </DashboardTemplate>
  );
}
