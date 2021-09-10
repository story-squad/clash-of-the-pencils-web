import React from 'react';
import writeImage from '../../../../assets/img/handwriting.gif';
import submitStory from '../../../../assets/img/submit-story.gif';
import { Carousel } from '../../../common';
import PlayWithBlaze from './PlayWithBlaze';
import TextWithImageCard from './TextWithImageCard';

const LandingCarousel = (): React.ReactElement => {
  return (
    <Carousel secondsToChange={5}>
      <PlayWithBlaze />
      {/* <SocialMediaGuest /> */}
      <TextWithImageCard text="Write" image={writeImage} />
      <TextWithImageCard text="Submit" image={submitStory} />
    </Carousel>
  );
};

export default LandingCarousel;
