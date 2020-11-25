import React from 'react';
import { Submissions } from '../../../api';
import { nav } from '../../../config';
import { Header, SubCard } from '../../common';
import { PromptBox } from './PromptBox';

import todaysPrompt from '../../../assets/todays-story-prompt.png';

interface RenderDashboardProps {
  picList: Submissions.SubItem[];
}

const RenderDashboard = ({
  picList,
}: RenderDashboardProps): React.ReactElement => {
  return (
    <div className="dashboard-container">
      <Header menuItems={nav.siteNavItems} />
      <div className="dashboard">
        <div className="sidebar">
          <h2>My Stories</h2>
          <div className="story-list">
            {picList.map((pic, i) => (
              <SubCard key={i} {...pic} />
            ))}
            {picList.length === 0 && (
              <div className="message">
                You don&apos;t have any past submissions. Check back later!
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <img src={todaysPrompt} alt="Today's Story Prompt" />
          <PromptBox />
        </div>
      </div>
    </div>
  );
};

export default RenderDashboard;
