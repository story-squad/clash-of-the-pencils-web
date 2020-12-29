import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, results } from '../../../state';
import { Loader } from '../../common';
import RenderResultsPage from './RenderResultsPage';

const ResultsPageContainer = (): React.ReactElement => {
  const [winner, setWinner] = useRecoilState(results.winner);
  const [scoreboard, setScoreboard] = useRecoilState(results.scoreboard);
  const setLoadingError = useSetRecoilState(apiError.global);

  useEffect(() => {
    setLoadingError(null);
    Promise.all([Submissions.getWinner(), Submissions.getScoreboard()])
      .then(([sub, sb]) => {
        console.log({ sub, sb });
        setLoadingError(null);
        setWinner(sub);
        setScoreboard(sb);
      })
      .catch((err) => {
        console.log({ err });
        setLoadingError(err);
      });
  }, []);

  if (winner || scoreboard) {
    return <RenderResultsPage />;
  } else {
    return <Loader />;
  }
};

export default ResultsPageContainer;
