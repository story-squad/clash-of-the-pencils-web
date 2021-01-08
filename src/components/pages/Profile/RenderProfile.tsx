import React, { useState } from 'react';
import { Header } from '../../common';
import { EditProfile } from './EditProfile';
import { Gallery } from './ProfileGallery';
import { ProfileNav } from './ProfileNav';

const RenderProfile = (): React.ReactElement => {
  // State to show if the gallery or the edit profile
  const [showGallery, setShowGallery] = useState(true);
  return (
    <div>
      <Header />
      <ProfileNav show={showGallery} setShow={setShowGallery} />
      {/* <div className="profile-content"> */}
      {showGallery ? <Gallery /> : <EditProfile />}
      {/* </div> */}
    </div>
  );
};

export default RenderProfile;
