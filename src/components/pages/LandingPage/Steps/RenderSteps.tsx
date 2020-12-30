import React from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { NavDirection } from '../NavArrowButton';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const numberOfSteps = 4;

const RenderSteps = (props: RenderStepsProps): React.ReactElement => {
  const currentStep = () => {
    const stepsProps = {
      responsiveHeightRefs: props.responsiveHeightRefs,
      buttonNavX: props.buttonNavX,
      circles: circles,
    };
    switch (props.stepNum) {
      case 1:
        return <Step1 {...stepsProps} />;
      case 2:
        return <Step2 {...stepsProps} />;
      case 3:
        return <Step3 {...stepsProps} />;
      case 4:
        return <Step4 {...stepsProps} />;
      default:
        return <StepError />;
    }
  };

  const circles = () => {
    const circles = [...new Array(numberOfSteps)].map((x, i) => {
      if (i + 1 === props.stepNum) return <FaCircle key={i} />;
      else return <FaRegCircle key={i} />;
    });
    return <div className="circles">{circles.map((c) => c)}</div>;
  };

  return (
    <div
      className="steps"
      ref={(element) =>
        (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
          element as HTMLDivElement,
        )
      }
      style={{ height: window.innerHeight }}
    >
      {/* Step-by-step instructions go here! Should render based off of stepNum */}
      {currentStep()}
    </div>
  );
};

const StepError = (): React.ReactElement => {
  return (
    <div className="error">
      There was an error loading the game steps. Please try again!
    </div>
  );
};

interface RenderStepsProps extends BaseStepProps {
  stepNum: number;
}

export interface StepProps extends BaseStepProps {
  circles: () => React.ReactElement;
}

interface BaseStepProps {
  buttonNavX: (direction: NavDirection) => void;
  responsiveHeightRefs: React.RefObject<Set<HTMLDivElement>>;
}

export default RenderSteps;
