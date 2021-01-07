import React, { useState } from 'react';

const ProfileNav = (): React.ReactElement => {
  // State to show if the gallery or the edit profile
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="profile-nav">
      <div className="profile-switcher">
        <span
          className={showGallery ? 'active' : ''}
          onClick={() => setShowGallery(true)}
        >
          Gallery
        </span>
        <span
          className={!showGallery ? 'active' : ''}
          onClick={() => setShowGallery(false)}
        >
          Account
        </span>
      </div>
      <div className="profile-content">
        {showGallery ? 'Gallery' : 'Account'}
      </div>
    </div>
  );
};

export default ProfileNav;
