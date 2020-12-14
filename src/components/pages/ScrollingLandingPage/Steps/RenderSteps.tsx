import React from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const numberOfSteps = 3;

const RenderSteps = (props: RenderStepsProps): React.ReactElement => {
  const currentStep = () => {
    switch (props.stepNum) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <StepError />;
    }
  };

  const circles = () => {
    const circles = [...new Array(numberOfSteps)].map((x, i) => {
      if (i + 1 === props.stepNum) return <FaCircle />;
      else return <FaRegCircle />;
    });
    return <div className="circles">{circles.map((x) => x)}</div>;
  };

  return (
    <div className="steps">
      {/* Step-by-step instructions go here! Should render based off of stepNum */}
      {currentStep()}
      {circles()}
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

interface RenderStepsProps {
  stepNum: number;
}

export default RenderSteps;
