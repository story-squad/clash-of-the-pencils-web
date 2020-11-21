import React, { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiError, top3 } from '../../../state';
import { Submissions } from '../../../api';

import { Loader } from '../../common';
import { CastVote } from './CastVote';
import { ReadSubmissions } from './ReadSubmissions';
import { useRecoilState } from 'recoil';

const VotingPageContainer = (): React.ReactElement => {
  const [top3List, setTop3] = useRecoilState(top3.top3List);
  const finishedReading = useRecoilValue(top3.hasFinishedReadingState);
  const setLoadingError = useSetRecoilState(apiError.global);

  useEffect(() => {
    if (!top3List) {
      setLoadingError(null);
      Submissions.getTop3Subs()
        .then((top3Subs) => {
          setLoadingError(null);
          setTop3(top3Subs);
        })
        .catch((err) => {
          console.log(err);
          setLoadingError(err.message);
        });
    }
  }, []);

  if (top3List) {
    return finishedReading ? <CastVote /> : <ReadSubmissions />;
  } else {
    return <Loader />;
  }
};

export default VotingPageContainer;
