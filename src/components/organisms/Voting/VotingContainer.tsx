import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Voting } from '../../../api';
import { app, top3, voting } from '../../../state';
import { Loader } from '../../molecules';
import { VotingDragAndDropContext } from '../../providers';
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
    <React.Suspense fallback={<Loader message="Loading Top 3" center />}>
      <VotingDragAndDropContext>
        <VotingSubscriber {...props} />
      </VotingDragAndDropContext>
    </React.Suspense>
  );
}

function VotingSubscriber({
  submitVotes,
}: VotingContainerProps): React.ReactElement {
  const top3List = useRecoilValue(top3.top3List);
  const hasReadAll = useRecoilValue(voting.hasReadAll);
  const canSubmit = useRecoilValue(voting.canSubmit);
  const formattedVotes = useRecoilValue(voting.formattedVotes);
  const phase = useRecoilValue(app.phase);

  // Set the user's vote item in state
  const setVoteItem = useSetRecoilState(voting.userVotes);

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

  return (
    <VotingComponent
      phase={phase}
      top3={top3List}
      hasReadAll={hasReadAll}
      canSubmit={canSubmit}
      submitVotes={submitHandler}
      resetVotes={resetVoteDropZones}
    />
  );
}
