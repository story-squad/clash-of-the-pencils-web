import React from 'react';
import { Carousel } from '../../../common';
import PlayWithBlaze from './PlayWithBlaze';

const LandingCarousel = (): React.ReactElement => {
  return (
    <Carousel>
      {/* <SocialMediaGuest /> */}
      <PlayWithBlaze />
    </Carousel>
  );
};

export default LandingCarousel;
