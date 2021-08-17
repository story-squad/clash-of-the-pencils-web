import React from 'react';
import { useRecoilState } from 'recoil';
import { app } from '../../../state';
import Header from './Header';

/**
 * This container serves as an injection layer so that in testing and development
 * we can test the `Header` component by passing in the necessary context without
 * needing the Recoil layer.
 */
export default function HeaderContainer(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(app.headerMenuIsOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log('hit');
  };

  return <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />;
}
