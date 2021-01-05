import React from 'react';
import { SEO } from '../../common';
import RenderResultsPage from './RenderResultsPage';

const ResultsPageContainer = (): React.ReactElement => {
  return (
    <>
      <SEO title="View Winners" path="/results" />
      <RenderResultsPage />
    </>
  );
};

export default ResultsPageContainer;
