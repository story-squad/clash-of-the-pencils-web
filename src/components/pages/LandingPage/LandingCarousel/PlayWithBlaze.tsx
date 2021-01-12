import React from 'react';
import { Link } from 'react-router-dom';
import hiImBlaze from '../../../../assets/img/hi-im-blaze.png';
import unleashYourCreativity from '../../../../assets/img/landing-text.png';

const PlayWithBlaze = (): React.ReactElement => {
  return (
    <div className="play-with-blaze">
      <img
        src={unleashYourCreativity}
        className="unleash"
        alt="Unleash your creativity with Story Squad's Free Daily Story Contest"
      />
      <img
        src={hiImBlaze}
        className="blaze"
        alt="Dragin saying: Hi! I'm Blaze, and I can't wait to read your stories!"
      />
      <Link to="/game">Play Now!</Link>
    </div>
  );
};

export default PlayWithBlaze;
