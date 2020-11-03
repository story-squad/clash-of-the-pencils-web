import React from 'react';
import { Header, SubCard } from '../../common';

interface RenderDashboardProps {
  picList: { src: string; alt?: string }[];
}

const RenderDashboard = ({
  picList,
}: RenderDashboardProps): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="content"></div>
        <div className="sidebar">
          {picList.map((pic, i) => (
            <SubCard key={i} {...pic} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RenderDashboard;
