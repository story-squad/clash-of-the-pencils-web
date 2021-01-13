import React from 'react';
import { Carousel } from '../../../common';
import SocialMediaGuest from './SocialMediaGuest';

const LandingCarousel = (): React.ReactElement => {
  return (
    <Carousel secondsToChange={6}>
      {/* <SocialMediaGuest /> */}
      <SocialMediaGuest />
      {/* <PlayWithBlaze /> */}
    </Carousel>
  );
};

export default LandingCarousel;
