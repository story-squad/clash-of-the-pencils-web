import React from 'react';
import { Header } from '../../common';
import { ProfileNav } from './Nav';

const RenderProfile = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <ProfileNav />
    </div>
  );
};

export default RenderProfile;
