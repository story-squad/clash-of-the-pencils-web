import React from 'react';
import { time } from '../../../utils';
import { InstructionCard } from '../../molecules';
import { CardList } from '../CardList';

export default function InstructionCardList({
  canSubmit,
  hasReadAll,
  phase,
  userHasVoted,
}: {
  phase: time.eventType;
  hasReadAll: boolean;
  userHasVoted: boolean;
  canSubmit: boolean;
}): React.ReactElement {
  return (
    <CardList>
      <InstructionCard
        step={1}
        active={phase === 'vote' && !hasReadAll && !userHasVoted}
        complete={hasReadAll || userHasVoted}
      />
      <InstructionCard
        step={2}
        active={phase === 'vote' && hasReadAll && !canSubmit && !userHasVoted}
        complete={canSubmit || userHasVoted}
      />
      <InstructionCard
        step={3}
        active={phase === 'vote' && canSubmit}
        complete={userHasVoted}
      />
    </CardList>
  );
}
