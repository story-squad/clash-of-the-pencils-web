import React from 'react';
import { AccessControl } from '../../common';
import RenderVotingPage from './RenderVotingPage';

const VotingPageContainer: React.FC = () => {
  return (
    <>
      <AccessControl event="VOTE" />
      <RenderVotingPage />
    </>
  );
};

export default VotingPageContainer;
