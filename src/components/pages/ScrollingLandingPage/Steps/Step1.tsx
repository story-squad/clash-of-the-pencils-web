import React from 'react';
import dummyPrompt from '../../../../assets/img/dummy-prompt.png';
import scopeOut from '../../../../assets/img/scope-out-prompt.png';
import { DragonBoi } from '../Home/DragonBoi';

const Step1 = (): React.ReactElement => {
  return (
    <div className="step-1">
      <h2>Step 1</h2>
      <img
        className="img-center"
        src={scopeOut}
        alt="1. Scope out the prompt."
      />
      <img
        className="img-center"
        src={dummyPrompt}
        alt="Prompt: you're a super hero, and there is a town that needs saving."
      />
      <DragonBoi />
    </div>
  );
};

export default Step1;
