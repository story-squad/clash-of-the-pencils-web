import { useAsync } from '@story-squad/react-utils';
import React, { Suspense, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { submissions } from '../../../state';
import { DragonLoader } from '../../molecules';
import WinnersView from './WinnersView';

const WINNER_LOADER = <DragonLoader className="winners-view-loader" />;

function WinnersViewContainer(): React.ReactElement {
  const winnerIds = useRecoilValue(submissions.winners.list);
  const addWinners = useSetRecoilState(submissions.winners.add);

  const [loadWinner, loading] = useAsync({
    asyncFunction: Submissions.getWinner,
    onSuccess: (data) => {
      addWinners(data);
      console.log({ data });
    },
  });

  useEffect(() => {
    if (!winnerIds && !loading) loadWinner();
  }, []);

  return winnerIds ? <WinnersView winnerIds={winnerIds} /> : WINNER_LOADER;
}

export default function WinnersViewContainerSuspense(): React.ReactElement {
  return (
    <Suspense fallback={WINNER_LOADER}>
      <WinnersViewContainer />
    </Suspense>
  );
}
