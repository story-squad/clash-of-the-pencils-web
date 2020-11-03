import React from 'react';
import { AccessControl } from '../../common';
import RenderVotingPage from './RenderVotingPage';

const VotingPageContainer: React.FC = () => {
  return (
    <>
      <AccessControl page="VOTE" />
      <RenderVotingPage />
    </>
  );
};

export default VotingPageContainer;
