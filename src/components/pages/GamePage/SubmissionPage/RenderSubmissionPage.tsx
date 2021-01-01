import React from 'react';
import todaysPromptPNG from '../../../../assets/img/PNGs/todays-story-prompt.png';
import todaysPromptWEBP from '../../../../assets/img/WebPs/todays-story-prompt.webp';
import { Header, Image, PromptBox } from '../../../common';

const RenderSubmissionPage = (): React.ReactElement => {
  return (
    <div className="submission-page-container">
      <Header />
      <div className="submission-page">
        <div className="content">
          <Image
            webp={todaysPromptWEBP}
            src={todaysPromptPNG}
            alt="Today's Story Prompt"
          />
          <PromptBox />
        </div>
      </div>
    </div>
  );
};

export default RenderSubmissionPage;
