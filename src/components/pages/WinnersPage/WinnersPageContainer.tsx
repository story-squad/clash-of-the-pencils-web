import React from 'react';
import { AccessControl } from '../../common';
import RenderWinnersPage from './RenderWinnersPage';

const WinnersPageContainer: React.FC = () => {
  return (
    <>
      <AccessControl page="NONE" />
      <RenderWinnersPage />
    </>
  );
};

export default WinnersPageContainer;
