import { useAsync } from '@story-squad/react-utils';
import React, { useMemo } from 'react';
import { Submissions } from '../../../api';
import { useConfirmationModal } from '../../../hooks';
import { time } from '../../../utils';
import { DragonBank } from '../../molecules';
import InstructionCardList from './InstructionCardList';
import './styles/index.scss';
import VotingButtons from './VotingButtons';
import VotingCardList from './VotingCardList';

export interface VotingProps {
  phase: time.eventType;
  top3: Submissions.ISubItem[];
  canSubmit?: boolean;
  submitVotes: () => Promise<unknown>;
  resetVotes: () => void;
  hasReadAll?: boolean;
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

  const streamTime = useMemo(
    () => time.schedule.stream.start.toLocal().toFormat('h:mm a'),
    [time.schedule.stream.start],
  );

  const [successModal, openSuccessModal] = useConfirmationModal({
    title: 'Your votes have been received!',
    confirmText: 'Back to Dashboard',
    hideCancelButton: true,
    message: `Tune into the Story Squad livestream at ${streamTime} to find out today’s champion!`,
  });

  const [exec, loading, , err] = useAsync({
    asyncFunction: submitVotes,
    onSuccess: openSuccessModal,
  });

  return (
    <section className="voting-wrapper">
      {successModal}
      <div className="voting-container">
        <h2>Read &amp; Rank the Top 3 Stories</h2>
        <InstructionCardList
          canSubmit={canSubmit}
          hasReadAll={hasReadAll}
          phase={phase}
          userHasVoted={userHasVoted}
        />
        <h3>Drop the Dragons to Vote</h3>
        <DragonBank
          dragDisabled={dragDisabled || !hasReadAll || userHasVoted}
        />
        <VotingCardList
          hasReadAll={hasReadAll}
          phase={phase}
          top3={top3}
          userHasVoted={userHasVoted}
        />
        {err && (
          <div className="error-message">
            <span className="red">*</span>
            {err.message}
          </div>
        )}
        {phase === 'vote' && (
          <VotingButtons
            buttonsDisabled={userHasVoted || loading}
            loading={loading}
            onClear={resetVotes}
            onSubmit={exec}
            submitDisabled={!canSubmit}
          />
        )}
      </div>
    </section>
  );
}
