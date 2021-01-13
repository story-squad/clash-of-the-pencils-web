import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Header } from '../../common';
import { EditProfile } from './EditProfile';
import { Gallery } from './ProfileGallery';
import { ProfileNav } from './ProfileNav';

const RenderProfile = (): React.ReactElement => {
  // State to show if the gallery or the edit profile
  const [showGallery, setShowGallery] = useState(true);
  const username = useRecoilValue(auth.username);
  const email = useRecoilValue(auth.email);

  return (
    <div>
      <Header />
      <div className="profile-page">
        <ProfileNav show={showGallery} setShow={setShowGallery} />
        <div className="user-info">
          <h2>
            <em>&#128100;</em> {username}
          </h2>
          <h3>
            <em>&#128231;</em> {email}
          </h3>
        </div>
        {showGallery ? <Gallery /> : <EditProfile />}
      </div>
    </div>
  );
};

export default RenderProfile;
