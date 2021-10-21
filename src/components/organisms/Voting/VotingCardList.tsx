import React from 'react';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { EmptyCard, SubmissionCard } from '../../molecules';
import { CardList } from '../CardList';

export default function VotingCardList({
  hasReadAll,
  phase,
  top3Ids,
  userHasVoted,
}: {
  phase: time.eventType;
  top3Ids: number[];
  hasReadAll: boolean;
  userHasVoted: boolean;
}): React.ReactElement {
  return (
    <CardList>
      {phase === 'vote' ? (
        top3Ids.map((id, i) => (
          <SubmissionCard
            key={id}
            droppable
            // This is okay, there will only ever be 3 subs here so we can coerce
            position={(i + 1) as voting.Places}
            submissionId={id}
            phase={phase}
            hasReadAll={hasReadAll}
            userHasVoted={userHasVoted}
          />
        ))
      ) : (
        <>
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
        </>
      )}
    </CardList>
  );
}
