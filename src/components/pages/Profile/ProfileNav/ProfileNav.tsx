import React from 'react';

const ProfileNav = (props: {
  show: boolean;
  setShow: (arg: boolean) => void;
}): React.ReactElement => {
  return (
    <div className="profile-nav">
      <span
        className="profile-nav-span"
        role="link"
        onClick={() => props.setShow(true)}
      >
        Gallery
      </span>
      <span
        className="profile-nav-span"
        role="link"
        onClick={() => props.setShow(false)}
      >
        Account
      </span>
    </div>
  );
};

export default ProfileNav;
