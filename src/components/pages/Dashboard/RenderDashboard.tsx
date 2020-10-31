import React from 'react';
import { Header } from '../../common';

const RenderDashboard = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="dashboard"></div>
    </>
  );
};

export default RenderDashboard;
