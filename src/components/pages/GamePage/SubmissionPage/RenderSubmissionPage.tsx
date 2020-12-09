import React from 'react';
import { Submissions } from '../../../../api';
import todaysPrompt from '../../../../assets/img/todays-story-prompt.png';
import { Header, Loader } from '../../../common';
import { PromptBox } from './PromptBox';

const RenderSubmissionPage = ({
  list,
}: RenderSubmissionPageProps): React.ReactElement => {
  return !list ? (
    <Loader />
  ) : (
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

interface RenderSubmissionPageProps {
  list: Submissions.SubItem[];
}

export default RenderSubmissionPage;
