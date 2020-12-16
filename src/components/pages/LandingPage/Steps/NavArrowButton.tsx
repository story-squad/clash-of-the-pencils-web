import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { NavDirection } from './StepsContainer';

const NavArrowButton = (props: NavArrowButtonProps): React.ReactElement => {
  const className = `nav-arrow-button ${props.navDirection}`;
  const ariaLabel = `Navigate ${props.navDirection}`;

  return (
    <button
      className={className}
      aria-label={ariaLabel}
      onClick={() => props.buttonNav(props.navDirection)}
    >
      {props.navDirection === 'left' ? <FaAngleLeft /> : <FaAngleRight />}
    </button>
  );
};

interface NavArrowButtonProps {
  navDirection: NavDirection;
  buttonNav: (direction: NavDirection) => void;
}

export default NavArrowButton;
