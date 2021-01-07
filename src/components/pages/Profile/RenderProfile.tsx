import React, { useState } from 'react';
import { Header } from '../../common';
import { ProfileNav } from './ProfileNav';

const RenderProfile = (): React.ReactElement => {
  // State to show if the gallery or the edit profile
  const [showGallery, setShowGallery] = useState(true);
  return (
    <div>
      <Header />
      <ProfileNav show={showGallery} setShow={setShowGallery} />
    </div>
  );
};

export default RenderProfile;
