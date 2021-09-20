import React from 'react';
import { Submissions } from '../../../api';
import { voting } from '../../../state';
import { time } from '../../../utils';
import {
  DragonBank,
  EmptyCard,
  InstructionCard,
  SubmissionCard,
} from '../../molecules';
import { CardList } from '../CardList';
import './styles/index.scss';

export interface VotingProps {
  phase: time.eventType;
  top3: Submissions.ISubItem[];
  hasReadAll?: boolean;
}

export default function Voting({
  phase,
  top3,
  hasReadAll = false,
}: VotingProps): React.ReactElement {
  const dragDisabled = phase !== 'vote';
  return (
    <section className="voting-wrapper">
      <div className="voting-container">
        <h2>Read &amp; Rank the Top 3 Stories</h2>
        <CardList>
          <InstructionCard step={1} />
          <InstructionCard step={2} />
          <InstructionCard step={3} />
        </CardList>
        <h3>Drop the Dragons to Vote</h3>
        <DragonBank dragDisabled={dragDisabled || !hasReadAll} />
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
              />
            ))
          )}
        </CardList>
      </div>
    </section>
  );
}
