import React from 'react';
import hiImBlaze from '../../../../assets/img/hi-im-blaze.png';
import howItWorks from '../../../../assets/img/how-it-works.png';
import landingText from '../../../../assets/img/landing-text.png';
import { Header } from '../../../common';
import NavArrowButton, { NavDirection } from '../NavArrowButton';

const Home = (props: HomeProps): React.ReactElement => {
  return (
    <div
      className="home-page-wrapper"
      ref={(element) => props.responsiveHeightRefs.current.push(element)}
      style={{ height: window.innerHeight }}
    >
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
          <NavArrowButton buttonNav={props.buttonNav} navDirection="down" />
        </div>
      </div>
    </div>
  );
};

interface HomeProps {
  buttonNav: (navDirection: NavDirection) => void;
  responsiveHeightRefs: React.RefObject<any>;
}

export default Home;
