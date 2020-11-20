import React from 'react';
import { Submissions } from '../../../api';
import { nav } from '../../../config';
import { ComingSoon, Header, Histogram, SubCard } from '../../common';
import { PromptBox } from './PromptBox';

import todaysPrompt from '../../../assets/todays-prompt.png';

interface RenderDashboardProps {
  picList: Submissions.SubItem[];
}

const showPicList = false;

const RenderDashboard = ({
  picList,
}: RenderDashboardProps): React.ReactElement => {
  return (
    <div className="dashboard-container">
      <Header menuItems={nav.siteNavItems} />
      <div className="dashboard">
        <div className="sidebar">
          <h2>My Stories</h2>
          {showPicList ? (
            <div className="story-list">
              {picList.map((pic, i) => (
                <SubCard key={i} {...pic} />
              ))}
            </div>
          ) : (
            <ComingSoon fullPage={false} />
          )}
        </div>
        <div className="content">
          <img src={todaysPrompt} alt="Today's Story Prompt" />
          <PromptBox />
          <Histogram />
        </div>
      </div>
    </div>
  );
};

export default RenderDashboard;
