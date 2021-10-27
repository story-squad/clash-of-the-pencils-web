import React from 'react';
import useHeaderContext from './useHeaderContext';

export default function NavTutorial(): React.ReactElement {
  const { runTutorial, closeMenu } = useHeaderContext();
  const onClick = () => {
    closeMenu();
    runTutorial();
  };
  return (
    <li onClick={onClick}>
      <a>Tutorial</a>
    </li>
  );
}
