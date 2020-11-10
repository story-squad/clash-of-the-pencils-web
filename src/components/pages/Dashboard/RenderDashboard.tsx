import React from 'react';
import { nav } from '../../../config';
import { Header, SubCard } from '../../common';

interface RenderDashboardProps {
  picList: { src: string; alt?: string }[];
}

const RenderDashboard = ({
  picList,
}: RenderDashboardProps): React.ReactElement => {
  return (
    <div>
      <Header menuItems={nav.siteNavItems} />
      <div className="dashboard">
        <div className="content">some content</div>
        <div className="sidebar">
          {picList.map((pic, i) => (
            <SubCard key={i} {...pic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderDashboard;
