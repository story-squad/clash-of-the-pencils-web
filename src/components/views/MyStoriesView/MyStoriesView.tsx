import React from 'react';
import { FullscreenImageOverlay } from '../../modals';
import { SubmissionCard } from '../../molecules';
import { CardList } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface MyStoriesViewProps {
  submissionIds: number[];
}

export default function MyStoriesView({
  submissionIds,
}: MyStoriesViewProps): React.ReactElement {
  return (
    <DashboardTemplate className="my-submissions-view">
      <FullscreenImageOverlay />
      <div className="my-submissions">
        <h2>My Stories</h2>
        {submissionIds.length < 1 ? (
          <p>You haven&apos;t submitted any stories&nbsp;yet!</p>
        ) : (
          <CardList className="my-submissions-card-list">
            {submissionIds.map((id) => (
              <SubmissionCard
                showDelete={true}
                key={id}
                droppable={false}
                submissionId={id}
              />
            ))}
          </CardList>
        )}
      </div>
    </DashboardTemplate>
  );
}
