import React, { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiError, top3, user } from '../../../state';
import { Submissions } from '../../../api';

import { Countdown, Header, Loader } from '../../common';
import { CastVote } from './CastVote';
import { ReadSubmissions } from './ReadSubmissions';
import { useRecoilState } from 'recoil';
import { nav } from '../../../config';

const VotingPageContainer = (
  props: Countdown.CountdownComponentProps,
): React.ReactElement => {
  const [top3List, setTop3] = useRecoilState(top3.top3List);
  const finishedReading = useRecoilValue(top3.hasFinishedReadingState);
  const setLoadingError = useSetRecoilState(apiError.global);
  useEffect(() => {
    if (props.active && !top3List) {
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

  if (!props.active) {
    return <NotVotingTime {...props} />;
  } else if (top3List) {
    return finishedReading ? <CastVote /> : <ReadSubmissions {...props} />;
  } else {
    return <Loader />;
  }
};

const NotVotingTime = ({
  DisplayCountdown,
}: Countdown.CountdownComponentProps): React.ReactElement => {
  const userId = useRecoilValue(user.userId);
  return (
    <div>
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
      <div className="voting-page">
        <div className="countdown-display">
          <h2>Voting is currently closed!</h2>
          <p>
            Check back in <DisplayCountdown /> to vote!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown.wrapper('vote')(VotingPageContainer);
