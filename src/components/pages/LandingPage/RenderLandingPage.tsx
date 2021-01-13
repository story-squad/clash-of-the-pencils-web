import React from 'react';
import { Header } from '../../common';
import { LandingCarousel } from './LandingCarousel';
import { Schedule } from './Schedule';

const RenderLandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <Header />
      <div className="landing-content">
        <LandingCarousel />
        <Schedule />
      </div>
    </div>
  );
};

export default RenderLandingPage;
