import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
// PNG images
import blazePNG from '../../../../assets/img/PNGs/hi-im-blaze.png';
import howItWorksPNG from '../../../../assets/img/PNGs/how-it-works.png';
import landingTextPNG from '../../../../assets/img/PNGs/landing-text.png';
// WebP images
import blazeWEBP from '../../../../assets/img/WebPs/hi-im-blaze.webp';
import howItWorksWEBP from '../../../../assets/img/WebPs/how-it-works.webp';
import landingTextWEBP from '../../../../assets/img/WebPs/landing-text.webp';
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
        <picture>
          <source srcSet={landingTextWEBP} />
          <img src={landingTextPNG} alt="Unleash your creativity!" />
        </picture>
        <picture>
          <source srcSet={blazeWEBP} type="image/webp" />
          <img
            src={blazePNG}
            className="dragon"
            alt="Dragon saying 'Hi, I'm Blaze, and I can't wait to read your stories!'"
          />
        </picture>
        <div className="how-it-works">
          <picture>
            <source srcSet={howItWorksWEBP} />
            <img src={howItWorksPNG} alt="How it works" />
          </picture>
          <FaAngleDown />
        </div>
      </div>
    </div>
  );
};

interface HomeProps {
  responsiveHeightRefs: React.RefObject<Set<HTMLDivElement>>;
}

export default Home;
