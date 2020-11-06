import React from 'react';
import { Link } from 'react-router-dom';
import dragonBoi from '../../../../assets/dragon-boi.png';

const Home = (): React.ReactElement => {
  return (
    <div className="home-page">
      <div className="thought-bubble">
        Hello! Welcome to Story Squad! You can sign in, create an account, or
        learn more below!
      </div>
      <div className="thought-trail-1">
        <div className="bubble" />
      </div>
      <div className="thought-trail-2">
        <div className="bubble" />
      </div>
      <img src={dragonBoi} alt="Dragon Boi mascot" />
      <div className="links">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="learn-more">
        <Link to="/info">Learn More</Link>
      </div>
    </div>
  );
};

export default Home;
