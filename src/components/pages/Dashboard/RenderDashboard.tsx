import React from 'react';
import { nav } from '../../../config';
import { Header, SubCard } from '../../common';
import PromptBox from './PromptBox';

interface RenderDashboardProps {
  picList: { src: string; alt?: string }[];
}

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
          <div className="story-list">
            {picList.map((pic, i) => (
              <SubCard key={i} {...pic} />
            ))}
          </div>
        </div>
        <div className="content">
          <PromptBox />
        </div>
      </div>
    </div>
  );
};

export default RenderDashboard;
