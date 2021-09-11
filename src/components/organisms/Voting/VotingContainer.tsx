import React from 'react';
import { useRecoilValue } from 'recoil';
import { top3 } from '../../../state';
import { time } from '../../../utils';
import { Loader } from '../../molecules';
import { VotingDragAndDropContext } from '../../providers';
import Voting from './Voting';

export interface VotingContainerProps {
  phase?: time.eventType;
}

export default function VotingContainer(
  props: VotingContainerProps,
): React.ReactElement {
  return (
    <React.Suspense fallback={<Loader message="Loading Top 3" center />}>
      <VotingSubscriber {...props} />
    </React.Suspense>
  );
}

function VotingSubscriber({
  phase = 'off',
}: VotingContainerProps): React.ReactElement {
  const top3List = useRecoilValue(top3.top3List);
  return (
    <VotingDragAndDropContext>
      <Voting phase={phase} top3={top3List} />
    </VotingDragAndDropContext>
  );
}
