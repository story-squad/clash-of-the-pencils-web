import { useAsync } from '@story-squad/react-utils';
import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../../api';
import { TUTORIAL_IDS } from '../../../config';
import { useConfirmationModal } from '../../../hooks';
import { app } from '../../../state';
import { time } from '../../../utils';
import { DragonBank } from '../../molecules';
import InstructionCardList from './InstructionCardList';
import './styles/index.scss';
import VotingButtons from './VotingButtons';
import VotingCardList from './VotingCardList';
export interface VotingProps {
  phase: time.eventType;
  top3Ids: number[];
  canSubmit?: boolean;
  submitVotes: () => Promise<unknown>;
  resetVotes: () => void;
  hasReadAll?: boolean;
  userHasVoted: boolean;
}

export default function Voting({
  phase,
  top3Ids,
  hasReadAll = false,
  canSubmit = false,
  submitVotes,
  resetVotes,
  userHasVoted,
}: VotingProps): React.ReactElement {
  const dragDisabled = phase !== 'vote';
  const currentMessage = useRecoilValue(app.tutorial.currentMessageIndex);

  const streamTime = useMemo(
    () => time.schedule.stream.start.toLocal().toFormat('h:mm a'),
    [time.schedule.stream.start],
  );

  const [successModal, openSuccessModal] = useConfirmationModal({
    title: 'Your votes have been received!',
    confirmText: 'Awesome!',
    hideCancelButton: true,
    message: `Tune into the Story Squad livestream at ${streamTime} to find out today’s champion!`,
  });

  const [errOverride, setError] = useState<string>();
  const [submitVotesHandler, loading, , err] = useAsync({
    run: submitVotes,
    onSuccess: openSuccessModal,
    onError: (error) => {
      if (Auth.isAxiosError(error) && error.response?.data) {
        const message =
          error.response.data.message ??
          error.response.data.error ??
          error.message;

        switch (message) {
          case 'Could not access this resource again so soon!':
            setError("It's too soon to vote again!");
            break;
          default:
            setError(message);
        }
      }
    },
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
        <div
          id={TUTORIAL_IDS.ID_TOP_THREE}
          className={` ${currentMessage === 5 ? 'active-tutorial' : ''}`}
        >
          <VotingCardList
            hasReadAll={hasReadAll}
            phase={phase}
            top3Ids={top3Ids}
            userHasVoted={userHasVoted}
          />
        </div>
        {(err || errOverride) && (
          <div className="error-message">
            <span className="red">*</span>
            {errOverride ?? err?.message}
          </div>
        )}
        {phase === 'vote' && (
          <VotingButtons
            buttonsDisabled={userHasVoted || loading}
            loading={loading}
            onClear={resetVotes}
            onSubmit={submitVotesHandler}
            submitDisabled={!canSubmit}
          />
        )}
      </div>
    </section>
  );
}
