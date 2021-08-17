import React from 'react';
import { useRecoilState } from 'recoil';
import { app } from '../../../state';
import Header from './Header';

export default function HeaderContainer(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(app.headerMenuIsOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log('hit');
  };

  return <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />;
}
