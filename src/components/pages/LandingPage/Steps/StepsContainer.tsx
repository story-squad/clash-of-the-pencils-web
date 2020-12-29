import React, { useEffect, useState } from 'react';
import { NavDirection } from '../NavArrowButton';
import RenderSteps from './RenderSteps';

const numberOfSteps = 4;

const StepsContainer = (props: StepsContainerProps): React.ReactElement => {
  const [stepNum, setStepNum] = useState<number>(1);

  useEffect(() => {
    document.addEventListener('keydown', keydownListener);
    return () => document.removeEventListener('keydown', keydownListener);
  }, []);

  const keydownListener = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      setStepNum((cur) => cur + (cur < numberOfSteps ? 1 : 0));
    } else if (event.key === 'ArrowLeft') {
      setStepNum((cur) => cur - (cur > 1 ? 1 : 0));
    }
  };

  const buttonNavX = (direction: NavDirection) => {
    if (direction === 'right') {
      setStepNum((cur) => cur + (cur < numberOfSteps ? 1 : 0));
    } else if (direction === 'left') {
      setStepNum((cur) => cur - (cur > 1 ? 1 : 0));
    }
  };

  return (
    <RenderSteps
      stepNum={stepNum}
      buttonNavX={buttonNavX}
      responsiveHeightRefs={props.responsiveHeightRefs}
    />
  );
};

interface StepsContainerProps {
  responsiveHeightRefs: React.RefObject<Set<HTMLDivElement>>;
}

export default StepsContainer;
