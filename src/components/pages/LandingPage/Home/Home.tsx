import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import hiImBlaze from '../../../../assets/img/hi-im-blaze.png';
import howItWorks from '../../../../assets/img/how-it-works.png';
import landingText from '../../../../assets/img/landing-text.png';
import { Header } from '../../../common';

const Home = (): React.ReactElement => {
  return (
    <div className="home-page-wrapper">
      <Header />
      <div className="home-page">
        <img src={landingText} alt="Unleash your creativity!" />
        <img
          src={hiImBlaze}
          className="dragon"
          alt="Dragon saying 'Hi, I'm Blaze, and I can't wait to read your stories!'"
        />
        <div className="how-it-works">
          <img src={howItWorks} alt="How it works" />
          <FaAngleDown />
        </div>
      </div>
    </div>
  );
};

export default Home;
