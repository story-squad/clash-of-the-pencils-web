import { useAsync } from '@story-squad/react-utils';
import React, { Suspense, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { submissions } from '../../../state';
import { DragonLoader } from '../../molecules';
import { DashboardTemplate } from '../../templates';
import './styles/winnersViewLoader.scss';
import WinnersView from './WinnersView';

const WINNER_LOADER = (
  <DashboardTemplate>
    <DragonLoader className="winners-view-loader" />
  </DashboardTemplate>
);

function WinnersViewContainer(): React.ReactElement {
  const winnerIds = useRecoilValue(submissions.winners.list);
  const addWinners = useSetRecoilState(submissions.winners.add);

  const [loadWinner, loading] = useAsync({
    asyncFunction: Submissions.getWinners,
    onSuccess: addWinners,
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
