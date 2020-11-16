import React, { useMemo } from 'react';

// Current emptyDragon is the wrong shape/color
import emptyDragon from '../../../../assets/empty-dragon.svg';
import dragonBoi from '../../../../assets/dragon-boi.svg';

const DropContainer = ({ index }: DropContainerProps): React.ReactElement => {
  const place = useMemo(() => {
    switch (index) {
      case 0:
        return '1st';
      case 1:
        return '2nd';
      case 2:
        return '3rd';
      default:
        return 'Error';
    }
  }, [index]);

  // Later this needs to be replaced with a recoil selector that checks if
  // this place has been chosen already, and conditionally renders a clear or
  // a full dragon based off of that
  const isSelected = useMemo(() => {
    switch (index) {
      case 0:
        return false;
      case 1:
        return false;
      default:
        return true;
    }
  }, []);

  return (
    <div className={`drop-container${isSelected ? ' active' : ''}`}>
      <p>{place}</p>
      <img src={isSelected ? dragonBoi : emptyDragon} alt="" />
    </div>
  );
};

interface DropContainerProps {
  index: number;
}

export default DropContainer;
