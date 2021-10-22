import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { app, auth } from '../../../state';
import Header from './Header';
import StorySquadHeader from './StorySquadHeader';
import { HeaderContextProvider } from './useHeaderContext';

/**
 * This container serves as an injection layer so that in testing and development
 * we can test the `Header` component by passing in the necessary context without
 * needing the Recoil layer.
 */
function HeaderContainer(): React.ReactElement {
  // Recoil subscriptions
  const [menuIsOpen, setMenuIsOpen] = useRecoilState(app.header.menuIsOpen);
  const user = useRecoilValue(auth.user);

  // Setters
  const toggleMenu = useCallback(
    () => setMenuIsOpen((prev) => !prev),
    [setMenuIsOpen],
  );
  const closeMenu = useCallback(() => setMenuIsOpen(false), [setMenuIsOpen]);

  // Navigation
  const { push } = useHistory();
  const openDashboard = () => push('/');

  // Logout
  const logout = useSetRecoilState(auth.login);

  return (
    <HeaderContextProvider
      value={{
        closeMenu,
        menuIsOpen,
        toggleMenu,
        openDashboard,
        user,
        logout,
      }}
    >
      <Header />
    </HeaderContextProvider>
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
