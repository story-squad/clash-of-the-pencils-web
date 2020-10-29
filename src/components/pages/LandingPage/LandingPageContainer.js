import React from 'react';
import LandingPage from './RenderLandingPage';

const LandingPageContainer = (props) => {
  return true ? (
    <LandingPage />
  ) : (
    <h2>couldn't load landing page for whatever reason</h2>
  );
};

export default LandingPageContainer;
