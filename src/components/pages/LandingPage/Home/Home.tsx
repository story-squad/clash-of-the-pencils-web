import React from 'react';
import { Link } from 'react-router-dom';
import { DragonBoi } from '../DragonBoi';
import { ThoughtBubble } from '../../../common';

import landingText from '../../../../assets/landing-text.png';

const Home = (): React.ReactElement => {
  return (
    <div className="home-page">
      <img src={landingText} alt="Unleash your creativity!" />
      <ThoughtBubble />
      <div className="flex-wrapper">
        <DragonBoi />
        <div className="links">
          <p>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </p>
          <div className="learn-more">
            <Link to="/info">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
