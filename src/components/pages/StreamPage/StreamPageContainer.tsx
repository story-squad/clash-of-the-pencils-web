import React from 'react';
import { AccessControl } from '../../common';
import RenderStreamPage from './RenderStreamPage';

const StreamPageContainer: React.FC = () => {
  return (
    <>
      <AccessControl event="STREAM" />
      <RenderStreamPage />
    </>
  );
};

export default StreamPageContainer;
