import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions, Voting } from '../../../api';
import { app, submissions, voting } from '../../../state';
import { DragonLoader } from '../../molecules';
import { VotingDragAndDropContext } from '../../providers';
import './styles/votingLoader.scss';
import VotingComponent from './Voting';

export interface VotingContainerProps {
  submitVotes?: () => Promise<unknown>;
}

/**
 * This component wraps the voting subscriber in React Suspense context.
 * This is needed as the `top3.top3List` has an asynchronous selector
 * for its default value, which will render the suspense fallback while
 * the API call is being made.
 *
 * It also wraps the component in a Drag and Drop context, which is
 * needed for the `react-beautiful-dnd` library to function properly.
 */
export default function VotingContainer(
  props: VotingContainerProps,
): React.ReactElement {
  return (
    <React.Suspense fallback={<DragonLoader className="voting-loader" />}>
      <VotingDragAndDropContext>
        <VotingSubscriber {...props} />
      </VotingDragAndDropContext>
    </React.Suspense>
  );
}

function VotingSubscriber({
  submitVotes,
}: VotingContainerProps): React.ReactElement {
  const top3Ids = useRecoilValue(submissions.top3.list);
  const addTop3 = useSetRecoilState(submissions.top3.add);
  const hasReadAll = useRecoilValue(voting.hasReadAll);
  const canSubmit = useRecoilValue(voting.canSubmit);
  const formattedVotes = useRecoilValue(voting.formattedVotes);
  const phase = useRecoilValue(app.phase);

  // Set the user's vote item in state
  const setVoteItem = useSetRecoilState(voting.userVotes);
  const userVotes = useRecoilValue(voting.userVotes);

  // Reset Handler
  const resetVotes = useSetRecoilState(voting.resetDropZones);
  const resetVoteDropZones = () => resetVotes(undefined);

  const submitHandler = useCallback(
    submitVotes ??
      (async () => {
        if (canSubmit && formattedVotes) {
          const { vote } = await Voting.submit(formattedVotes);
          setVoteItem(vote);
        }
      }),
    [submitVotes, formattedVotes],
  );

  const [loadTop3, loading] = useAsync({
    run: Submissions.getTop3Subs,
    onSuccess: addTop3,
  });

  useEffect(() => {
    if (!loading && !top3Ids) loadTop3();
  }, [loading]);

  return top3Ids ? (
    <VotingComponent
      phase={phase}
      top3Ids={top3Ids}
      hasReadAll={hasReadAll}
      canSubmit={canSubmit}
      submitVotes={submitHandler}
      resetVotes={resetVoteDropZones}
      userHasVoted={!!userVotes}
    />
  ) : (
    <DragonLoader className="voting-loader" />
  );
}
