import React from 'react';
import { Submissions } from '../../../api';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { EmptyCard, SubmissionCard } from '../../molecules';
import { CardList } from '../CardList';

export default function VotingCardList({
  hasReadAll,
  phase,
  top3,
  userHasVoted,
}: {
  phase: time.eventType;
  top3: Submissions.ISubItem[];
  hasReadAll: boolean;
  userHasVoted: boolean;
}): React.ReactElement {
  return (
    <CardList>
      {['admin', 'submit'].indexOf(phase) >= 0 ? (
        <>
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
        </>
      ) : (
        top3.map((sub, i) => (
          <SubmissionCard
            key={sub.id}
            // This is okay, there will only ever be 3 subs here so we can coerce
            position={(i + 1) as voting.Places}
            submission={sub}
            phase={phase}
            hasReadAll={hasReadAll}
            userHasVoted={userHasVoted}
          />
        ))
      )}
    </CardList>
  );
}
