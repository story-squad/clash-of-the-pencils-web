import React from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaAngleDown,
} from 'react-icons/fa';

const NavArrowButton = (props: NavArrowButtonProps): React.ReactElement => {
  const className = `nav-arrow-button ${props.navDirection}`;
  const ariaLabel = `Navigate ${props.navDirection}`;

  const icon = () => {
    switch (props.navDirection) {
      case 'left':
        return <FaAngleLeft />;
      case 'right':
        return <FaAngleRight />;
      case 'up':
        return <FaAngleUp />;
      case 'down':
        return <FaAngleDown />;
    }
  };

  return (
    <button
      className={className}
      aria-label={ariaLabel}
      onClick={() => props.buttonNav(props.navDirection)}
    >
      {icon()}
    </button>
  );
};

export type NavDirection = 'left' | 'right' | 'down' | 'up';

interface NavArrowButtonProps {
  navDirection: NavDirection;
  buttonNav: (direction: NavDirection) => void;
}

export default NavArrowButton;
