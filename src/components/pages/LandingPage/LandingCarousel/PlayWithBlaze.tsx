import React from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import hiImBlaze from '../../../../assets/img/hi-im-blaze.png';
import unleashYourCreativity from '../../../../assets/img/landing-text.png';
import { auth } from '../../../../state';

const PlayWithBlaze = (): React.ReactElement => {
  const setAuthOpen = useSetRecoilState(auth.authModalOpen);
  const setAuthIsLogin = useSetRecoilState(auth.authModalIsLogin);
  const openLogin = () => {
    setAuthOpen(true);
    setAuthIsLogin(true);
  };
  const openSignup = () => {
    setAuthOpen(true);
    setAuthIsLogin(false);
  };

  return (
    <div className="play-with-blaze">
      <img
        src={unleashYourCreativity}
        className="unleash"
        alt="Unleash your creativity with Story Squad's Free Daily Story Contest"
      />
      <div className="bot-wrapper">
        <img
          src={hiImBlaze}
          className="blaze"
          alt="Dragin saying: Hi! I'm Blaze, and I can't wait to read your stories!"
        />
        <div className="buttons">
          <Link to="/game">Play Now!</Link>
          <button onClick={openLogin}>Log In</button>
          <button onClick={openSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default PlayWithBlaze;
