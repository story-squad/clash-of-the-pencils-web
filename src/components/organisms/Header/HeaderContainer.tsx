import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useOpenDashboard } from '../../../hooks';
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

  // runTutorial Recoil Selector
  const runTutorial = useSetRecoilState(app.tutorial.runTutorial);

  // Setters
  const toggleMenu = useCallback(
    () => setMenuIsOpen((prev) => !prev),
    [setMenuIsOpen],
  );
  const closeMenu = useCallback(() => setMenuIsOpen(false), [setMenuIsOpen]);

  // Navigation
  const openDashboard = useOpenDashboard();

  // Logout
  const logout = useSetRecoilState(auth.login);
  const logoutAndCloseMenu = useCallback(() => {
    logout();
    closeMenu();
  }, [logout, closeMenu]);

  return (
    <HeaderContextProvider
      value={{
        closeMenu,
        menuIsOpen,
        toggleMenu,
        openDashboard,
        user,
        logout: logoutAndCloseMenu,
        runTutorial,
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
