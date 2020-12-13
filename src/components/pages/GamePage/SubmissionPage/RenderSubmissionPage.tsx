import React from 'react';
import todaysPrompt from '../../../../assets/img/todays-story-prompt.png';
import { Header } from '../../../common';
import { PromptBox } from './PromptBox';

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
