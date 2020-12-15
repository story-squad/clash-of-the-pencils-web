import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import landingText from '../../../../assets/img/landing-text.png';
import howItWorks from '../../../../assets/img/how-it-works.png';
import { Header } from '../../../common';
import { DragonBoi } from './DragonBoi';

const Home = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="home-page">
        <img src={landingText} alt="Unleash your creativity!" />
        <div className="flex-wrapper">
          <DragonBoi />
          <div className="links">
            <p>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </p>
            <div className="link-button">
              <Link to="/game">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="how-it-works">
          <img src={howItWorks} alt="How it works" />
          <FaAngleDown />
        </div>
      </div>
    </>
  );
};

export default Home;
