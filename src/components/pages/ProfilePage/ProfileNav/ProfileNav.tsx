import React from 'react';

const ProfileNav = (props: {
  galleryIsShowing: boolean;
  setGalleryIsShowing: (arg: boolean) => void;
}): React.ReactElement => {
  return (
    <div className="profile-nav">
      <span
        className={props.galleryIsShowing ? 'active' : ''}
        role="link"
        onClick={() => props.setGalleryIsShowing(true)}
      >
        Gallery
      </span>
      <span
        className={!props.galleryIsShowing ? 'active' : ''}
        role="link"
        onClick={() => props.setGalleryIsShowing(false)}
      >
        Account
      </span>
    </div>
  );
};

export default ProfileNav;
