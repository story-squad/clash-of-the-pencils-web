import React from 'react';
import firstPlaceDragon from '../../../../assets/img/first-place-dragon.png';
import writeImage from '../../../../assets/img/handwriting.gif';
import writingArrow from '../../../../assets/img/writing-arrow-submit.png';
import { Carousel } from '../../../common';
import PlayWithBlaze from './PlayWithBlaze';
import SocialMediaGuest from './SocialMediaGuest';
import TextWithImageCard from './TextWithImageCard';

const LandingCarousel = (): React.ReactElement => {
  return (
    <Carousel secondsToChange={5}>
      <PlayWithBlaze />
      <SocialMediaGuest />
      <TextWithImageCard text="Write" image={writeImage} />
      <TextWithImageCard text="Submit" image={writingArrow} />
      <TextWithImageCard text="Vote" image={firstPlaceDragon} />
    </Carousel>
  );
};

export default LandingCarousel;
