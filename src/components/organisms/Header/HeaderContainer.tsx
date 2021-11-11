import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useOpenDashboard } from '../../../hooks';
import { app, auth, tutorial } from '../../../state';
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

  console.log(menuIsOpen);
  // Navigation
  const openDashboard = useOpenDashboard();

  // runTutorial Recoil Selector
  const tutorialRunner = useSetRecoilState(tutorial.runTutorial);
  const runTutorial = () => {
    openDashboard();
    tutorialRunner();
  };

  // Setters
  const toggleMenu = () => setMenuIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setMenuIsOpen(false), [setMenuIsOpen]);

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
