import React from 'react';
import { Submissions } from '../../../api';
import { nav } from '../../../config';
import { ComingSoon, Header, SubCard } from '../../common';
import { PromptBox } from './PromptBox';

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
        <div
          className="sidebar"
          style={{ maxHeight: `${window.innerHeight - 44}px` }}
        >
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
          <PromptBox />
        </div>
      </div>
    </div>
  );
};

export default RenderDashboard;
