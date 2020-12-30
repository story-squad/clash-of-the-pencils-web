import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../../api';
import { results } from '../../../../state';
import CouldNotLoad from '../CouldNotLoad';
import RenderCelebration from './RenderCelebration';

const CelebrationContainer = (): React.ReactElement => {
  const [winner, setWinner] = useRecoilState(results.winner);
  const [error, setError] = useState<null | string>(null);
  // const winner = {
  //   id: 1,
  //   image: '123432452342',
  //   src:
  //     'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/landscaping-ideas-1582321830.jpg',
  //   userId: 5,
  //   username: 'A Longish Username',
  //   rotation: 0,
  // };
  useEffect(() => {
    if (!winner) {
      Submissions.getWinner()
        .then((w) => {
          setWinner(w);
        })
        .catch((err) => {
          console.log({ err });
          setError('Could not load winner');
        });
    }
  }, []);

  return winner ? (
    <RenderCelebration winner={winner} />
  ) : error ? (
    <CouldNotLoad className="celebration" error={error} />
  ) : (
    <div className="celebration loader">
      <p>Loading Winner...</p>
      <ScaleLoader />
    </div>
  );
};

export default CelebrationContainer;
