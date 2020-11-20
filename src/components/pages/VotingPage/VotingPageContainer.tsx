import React, { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiError, top3 } from '../../../state';
import { Submissions } from '../../../api';

import { Loader } from '../../common';
import { CastVote } from './CastVote';
import { ReadSubmissions } from './ReadSubmissions';

const VotingPageContainer = (): React.ReactElement => {
  const setTop3 = useSetRecoilState(top3.top3List);
  const top3List = useRecoilValue(top3.top3List);
  const finishedReading = useRecoilValue(top3.hasFinishedReadingState);
  const setLoadingError = useSetRecoilState(apiError.global);

  useEffect(() => {
    setLoadingError(null);
    Submissions.getTop3Subs()
      .then((res) => {
        setTop3(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoadingError(err.message);
      });
  }, []);

  if (top3List) {
    return finishedReading ? <CastVote /> : <ReadSubmissions />;
  } else {
    return <Loader />;
  }
};

export default VotingPageContainer;
