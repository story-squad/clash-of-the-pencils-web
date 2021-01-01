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
import { Header, Image } from '../../../common';

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
        <Image
          webp={landingTextWEBP}
          src={landingTextPNG}
          alt="Unleash your creativity!"
        />
        <Image
          webp={blazeWEBP}
          src={blazePNG}
          classes="dragon"
          alt="Dragon saying 'Hi, I'm Blaze, and I can't wait to read your stories!'"
        />
        <div className="how-it-works">
          <Image webp={howItWorksWEBP} src={howItWorksPNG} alt="How it works" />
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
