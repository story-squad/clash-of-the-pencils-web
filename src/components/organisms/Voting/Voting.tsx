import React from 'react';
import { Submissions } from '../../../api';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { DragonBank, SubmissionCard } from '../../molecules';
import { CardList } from '../CardList';
import './styles/index.scss';

export interface VotingProps {
  phase: time.eventType;
  top3: Submissions.ISubItem[];
}

export default function Voting({
  phase,
  top3,
}: VotingProps): React.ReactElement {
  return (
    <section className="voting-wrapper">
      <div className="voting-container">
        <h2>Read &amp; Rank the Top 3 Stories</h2>
        {/* Here is where the instruction cards go */}
        <h3>Drop the Dragons to Vote</h3>
        <DragonBank />
        <CardList>
          {top3.map((sub, i) => (
            <SubmissionCard
              key={sub.id}
              // This is okay, there will only ever be 3 subs here so we can coerce
              position={(i + 1) as voting.Places}
              submission={sub}
              phase={phase}
            />
          ))}
        </CardList>
      </div>
    </section>
  );
}
