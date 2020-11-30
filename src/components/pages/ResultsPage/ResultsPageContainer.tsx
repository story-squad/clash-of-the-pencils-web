import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, results } from '../../../state';
import RenderResultsPage from './RenderResultsPage';
import ResultsClosed from './ResultsClosed';

const ResultsPageContainer = (): React.ReactElement => {
  const [winner, setWinner] = useRecoilState(results.winner);
  const setLoadingError = useSetRecoilState(apiError.global);

  useEffect(() => {
    if (!winner) {
      setLoadingError(null);
      Submissions.getWinner()
        .then((sub) => {
          setLoadingError(null);
          setWinner(sub);
        })
        .catch((err) => {
          console.log({ err });
          setLoadingError(err.message);
        });
    }
  }, []);

  return winner ? <RenderResultsPage /> : <ResultsClosed />;
};

export default ResultsPageContainer;
