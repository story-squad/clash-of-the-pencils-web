import React from 'react';
import hiImBlaze from '../../../../assets/img/hi-im-blaze.png';
import howItWorks from '../../../../assets/img/how-it-works-arrow.png';
import landingText from '../../../../assets/img/landing-text.png';
import { Header } from '../../../common';

const Home = (props: HomeProps): React.ReactElement => {
  return (
    <div
      className="home-page-wrapper"
      ref={(element) =>
        (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
          element as HTMLDivElement,
        )
      }
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
        </div>
      </div>
    </div>
  );
};

interface HomeProps {
  responsiveHeightRefs: React.RefObject<Set<HTMLDivElement>>;
}

export default Home;
