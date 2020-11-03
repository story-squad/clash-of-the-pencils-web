import React from 'react';
import { AccessControl } from '../../common';
import RenderSubmissionPage from './RenderSubmissionPage';

const SubmissionPageContainer: React.FC = () => {
  return (
    <>
      <AccessControl page="SUBMIT" />
      <RenderSubmissionPage />
    </>
  );
};

export default SubmissionPageContainer;
