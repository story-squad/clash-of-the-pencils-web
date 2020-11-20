import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { results } from '../../../state';

import RenderResultsPage from './RenderResultsPage';
import { Loader } from '../../common';

const ResultsPageContainer = (): React.ReactElement => {
  const [winner, setWinner] = useRecoilState(results.winner);

  useEffect(() => {
    if (!winner)
      setWinner({
        image:
          'https://artprojectsforkids.org/wp-content/uploads/2020/05/Penguin.jpg',
        username: 'Catlady',
        userId: 1,
        id: 1,
      });
  }, []);

  return winner ? <RenderResultsPage /> : <Loader message="Loading Winner" />;
};

export default ResultsPageContainer;
