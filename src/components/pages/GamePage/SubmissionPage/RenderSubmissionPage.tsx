import React from 'react';
import todaysPrompt from '../../../../assets/img/PNGs/todays-story-prompt.png';
import { Header, PromptBox } from '../../../common';

const RenderSubmissionPage = (): React.ReactElement => {
  return (
    <div className="submission-page-container">
      <Header />
      <div className="submission-page">
        <div className="content">
          <img src={todaysPrompt} alt="Today's Story Prompt" />
          <PromptBox />
        </div>
      </div>
    </div>
  );
};

export default RenderSubmissionPage;
