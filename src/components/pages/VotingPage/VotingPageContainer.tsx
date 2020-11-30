import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, top3 } from '../../../state';
import { Loader } from '../../common';
import { CastVote } from './CastVote';
import { ReadSubmissions } from './ReadSubmissions';
import VotingClosed from './VotingClosed';

const VotingPageContainer = (): React.ReactElement => {
  const [top3List, setTop3] = useRecoilState(top3.top3List);
  const finishedReading = useRecoilValue(top3.hasFinishedReadingState);
  const setLoadingError = useSetRecoilState(apiError.global);
  // const { active } = time.getTimeUntilEvent('vote');
  const active = true;

  useEffect(() => {
    if (active && !top3List) {
      // Only load the top 3 if you haven't already AND it's voting time
      setLoadingError(null);
      Submissions.getTop3Subs()
        .then((top3Subs) => {
          if (top3Subs.length > 0) {
            setLoadingError(null);
            setTop3(top3Subs);
          } else {
            setTop3([]);
            // setLoadingError('Unable to find any submissions for today :(');
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadingError(err.message);
        });
    }
  }, [top3List]);

  if (!active) {
    return <VotingClosed />;
  } else if (top3List) {
    return finishedReading ? <CastVote /> : <ReadSubmissions />;
  } else {
    return <Loader />;
  }
};

export default VotingPageContainer;
