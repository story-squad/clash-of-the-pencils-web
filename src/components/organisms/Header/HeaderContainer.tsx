import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { app, auth } from '../../../state';
import Header from './Header';
import StorySquadHeader from './StorySquadHeader';

/**
 * This container serves as an injection layer so that in testing and development
 * we can test the `Header` component by passing in the necessary context without
 * needing the Recoil layer.
 */
function HeaderContainer(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(app.header.menuIsOpen);
  const user = useRecoilValue(auth.user);

  const { push } = useHistory();
  const openDashboard = () => push('/');

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log('hit');
  };

  return (
    <Header
      openDashboard={openDashboard}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      user={user}
    />
  );
}

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
