import React from 'react';
import hiImBlaze from '../../../../assets/img/hi-im-blaze.png';
import howItWorks from '../../../../assets/img/how-it-works.png';
import landingText from '../../../../assets/img/landing-text.png';
import { Header } from '../../../common';
import NavArrowButton, { NavDirection } from '../NavArrowButton';

const Home = (props: HomeProps): React.ReactElement => {
  return (
    <div className="home-page-wrapper">
      <Header />
      <div className="home-page">
        <img src={landingText} alt="Unleash your creativity!" />
        <div className="dragon-boi">
          <img src={hiImBlaze} className="dragon" />
        </div>
        <div className="how-it-works">
          <img src={howItWorks} alt="How it works" />
        </div>
      </div>
      <NavArrowButton buttonNav={props.buttonNav} navDirection="down" />
    </div>
  );
};

interface HomeProps {
  buttonNav: (navDirection: NavDirection) => void;
}

export default Home;
