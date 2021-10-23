import React from 'react';
import { FullscreenImageOverlay } from '../../modals';
import { SubmissionCard } from '../../molecules';
import { CardList } from '../../organisms';
import { DashboardTemplate } from '../../templates';

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
        <CardList className="my-submissions-card-list">
          {submissionIds.map((id) => (
            <SubmissionCard key={id} droppable={false} submissionId={id} />
          ))}
        </CardList>
      </div>
    </DashboardTemplate>
  );
}
