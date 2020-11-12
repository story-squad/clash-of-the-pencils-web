import React, { useState } from 'react';
import { CastVote } from './CastVote';
import { ReadSubmissions } from './ReadSubmissions';

const VotingPageContainer = (): React.ReactElement => {
  const [hasRead, setHasRead] = useState(false);

  return hasRead ? (
    <CastVote />
  ) : (
    <ReadSubmissions markAsRead={() => setHasRead(true)} />
  );
};

export default VotingPageContainer;
