import React, { createRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const NavArrowButton = (props: NavArrowButtonProps): React.ReactElement => {
  const className = `nav-arrow-button ${props.navDirection}`;
  const ariaLabel = `Navigate ${props.navDirection}`;
  const thisButton = createRef();

  const icon = () => {
    switch (props.navDirection) {
      case 'left':
        return <FaAngleLeft />;
      case 'right':
        return <FaAngleRight />;
    }
  };

  const handleClick = () => {
    props.buttonNav(props.navDirection);
    (thisButton.current as HTMLElement).blur();
  };

  return (
    <button
      className={className}
      aria-label={ariaLabel}
      ref={thisButton as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
    >
      {icon()}
    </button>
  );
};

export type NavDirection = 'left' | 'right';

interface NavArrowButtonProps {
  navDirection: NavDirection;
  buttonNav: (direction: NavDirection) => void;
}

export default NavArrowButton;
