import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, results } from '../../../state';
import { time } from '../../../utils';
import { Loader } from '../../common';
import RenderResultsPage from './RenderResultsPage';
import ResultsClosed from './ResultsClosed';

const ResultsPageContainer = (): React.ReactElement => {
  const [winner, setWinner] = useRecoilState(results.winner);
  const setLoadingError = useSetRecoilState(apiError.global);
  const { active } = time.getTimeUntilEvent('announce');

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

  // if we are NOT in the announcements time show results as closed
  // if we are in the announcements time show the RenderResultsPage aka the celebration station
  // otherwise we will show the loader
  if (!active) {
    return <ResultsClosed />;
  } else if (active) {
    return <RenderResultsPage />;
  } else {
    return <Loader />;
  }
};

export default ResultsPageContainer;
