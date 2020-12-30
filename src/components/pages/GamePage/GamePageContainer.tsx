import React, { useEffect, useState } from 'react';
import { time } from '../../../utils';
import { ReadTokenData, SEO } from '../../common';
import GameClosed from './GameClosed';
import { SubmissionPage } from './SubmissionPage';
import VotingPageContainer from './VotingPage/VotingPageContainer';

const GamePageContainer = (): React.ReactElement => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVote, setIsVote] = useState(false);

  useEffect(() => {
    setIsSubmit(time.getTimeUntilEvent('submit').active);
    setIsVote(time.getTimeUntilEvent('vote').active);
    const timeChecker = setInterval(() => {
      setIsSubmit(time.getTimeUntilEvent('submit').active);
      setIsVote(time.getTimeUntilEvent('vote').active);
    }, 1000);
    return () => clearInterval(timeChecker);
  }, []);

  return (
    <>
      <ReadTokenData />
      <SEO title="Play Game" path="/game" />
      {isSubmit ? (
        <SubmissionPage />
      ) : isVote ? (
        <VotingPageContainer />
      ) : (
        <GameClosed />
      )}
    </>
  );
};

export default GamePageContainer;
