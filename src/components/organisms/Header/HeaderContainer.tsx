import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { app, auth } from '../../../state';
import Header from './Header';
import HeaderContext from './headerContext';
import StorySquadHeader from './StorySquadHeader';

/**
 * This container serves as an injection layer so that in testing and development
 * we can test the `Header` component by passing in the necessary context without
 * needing the Recoil layer.
 */
function HeaderContainer(): React.ReactElement {
  const [menuIsOpen, setMenuIsOpen] = useRecoilState(app.header.menuIsOpen);
  const user = useRecoilValue(auth.user);

  const { push } = useHistory();
  const openDashboard = () => push('/');

  const toggleMenu = useCallback(
    () => setMenuIsOpen((prev) => !prev),
    [setMenuIsOpen],
  );

  const closeMenu = useCallback(() => setMenuIsOpen(false), [setMenuIsOpen]);

  return (
    <HeaderContext.Provider
      value={{
        closeMenu,
        menuIsOpen,
        toggleMenu,
        openDashboard,
        user,
      }}
    >
      <Header />
    </HeaderContext.Provider>
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
