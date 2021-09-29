import { useAsync } from '@story-squad/react-utils';
import React from 'react';
import { Submissions } from '../../../api';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
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
  canSubmit?: boolean;
  submitVotes: () => Promise<unknown>;
  resetVotes: () => void;
  userHasVoted: boolean;
}

export default function Voting({
  phase,
  top3,
  hasReadAll = false,
  canSubmit = false,
  submitVotes,
  resetVotes,
  userHasVoted,
}: VotingProps): React.ReactElement {
  const dragDisabled = phase !== 'vote';

  const [exec, loading] = useAsync({
    asyncFunction: submitVotes,
  });

  return (
    <section className="voting-wrapper">
      <div className="voting-container">
        <h2>Read &amp; Rank the Top 3 Stories</h2>
        <CardList>
          <InstructionCard
            step={1}
            active={phase === 'vote' && !hasReadAll && !userHasVoted}
            complete={hasReadAll || userHasVoted}
          />
          <InstructionCard
            step={2}
            active={
              phase === 'vote' && hasReadAll && !canSubmit && !userHasVoted
            }
            complete={canSubmit || userHasVoted}
          />
          <InstructionCard
            step={3}
            active={phase === 'vote' && canSubmit}
            complete={userHasVoted}
          />
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
        {phase === 'vote' && (
          <div className="button-row">
            <Button onClick={resetVotes} disabled={loading} type="secondary">
              Reset Votes
            </Button>
            <Button
              iconLeft={loading && <LoadIcon />}
              disabled={!canSubmit || loading}
              onClick={exec}
            >
              Submit Votes
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
