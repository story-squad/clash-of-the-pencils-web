import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import howItWorks from '../../../../assets/img/how-it-works.png';
import landingText from '../../../../assets/img/landing-text.png';
import { Header } from '../../../common';

const Home = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="home-page">
        <img src={landingText} alt="Unleash your creativity!" />
        <div className="flex-wrapper">
          <div className="dragon-boi">
            <DragonBoi className="dragon" />
          </div>
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
          <br />
          <FaAngleDown />
        </div>
      </div>
    </>
  );
};

export default Home;
