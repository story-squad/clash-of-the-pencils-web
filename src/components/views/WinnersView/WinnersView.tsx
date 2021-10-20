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

function BigWinner({ winnerId }: { winnerId: number }): React.ReactElement {
  return (
    <div className="big-winner">
      <div className="winner-content">
        <h2>Latest Champion</h2>
        <p>
          Here&apos;s the story that won our last contest. Click on the picture
          to get a better look!
        </p>
      </div>
      <SubmissionCard droppable={false} submissionId={winnerId} />
    </div>
  );
}
