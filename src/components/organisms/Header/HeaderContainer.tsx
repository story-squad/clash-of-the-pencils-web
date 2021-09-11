import React from 'react';
import { useRecoilState } from 'recoil';
import { app } from '../../../state';
import Header from './Header';
import StorySquadHeader from './StorySquadHeader';

export interface HeaderSwitcherProps {
  useStorySquadHeader?: boolean;
}

export default function HeaderSwitcher({
  useStorySquadHeader = false,
}: HeaderSwitcherProps): React.ReactElement {
  if (useStorySquadHeader) {
    return <StorySquadHeader />;
  } else {
    return <HeaderContainer />;
  }
}

/**
 * This container serves as an injection layer so that in testing and development
 * we can test the `Header` component by passing in the necessary context without
 * needing the Recoil layer.
 */
function HeaderContainer(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(app.header.menuIsOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log('hit');
  };

  return <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />;
}
