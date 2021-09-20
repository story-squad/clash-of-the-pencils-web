import React from 'react';
import { useRecoilValue } from 'recoil';
import { top3, voting } from '../../../state';
import { time } from '../../../utils';
import { Loader } from '../../molecules';
import { VotingDragAndDropContext } from '../../providers';
import Voting from './Voting';

export interface VotingContainerProps {
  phase?: time.eventType;
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
  phase = 'submit',
}: VotingContainerProps): React.ReactElement {
  const top3List = useRecoilValue(top3.top3List);
  const hasReadAll = useRecoilValue(voting.hasReadAll);
  return <Voting phase={phase} top3={top3List} hasReadAll={hasReadAll} />;
}
