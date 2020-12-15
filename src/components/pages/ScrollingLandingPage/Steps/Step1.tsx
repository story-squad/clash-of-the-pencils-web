import React from 'react';
import { PromptBox } from '../../../common/PromptBox';
import { DragonBoi } from '../Home/DragonBoi';

const Step1 = (): React.ReactElement => {
  return (
    <div className="step-1">
      <h2>Step 1</h2>
      <h3>Scope Out the Propmt</h3>
      <PromptBox />
      <DragonBoi />
    </div>
  );
};

export default Step1;
