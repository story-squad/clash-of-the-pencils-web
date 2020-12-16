import React from 'react';
import { NavDirection } from './StepsContainer';

const NavArrowButton = (props: NavArrowButtonProps): React.ReactElement => {
  const className = `nav-arrow-button ${props.navDirection}`;

  return (
    <button
      className={className}
      onClick={() => props.buttonNav(props.navDirection)}
    >
      {props.navDirection === 'left' ? 'Left' : 'Right'}
    </button>
  );
};

interface NavArrowButtonProps {
  navDirection: NavDirection;
  buttonNav: (direction: NavDirection) => void;
}

export default NavArrowButton;
