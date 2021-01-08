import React from 'react';

const ProfileNav = (props: {
  show: boolean;
  setShow: (arg: boolean) => void;
}): React.ReactElement => {
  return (
    <div className="profile-nav">
      <span
        className={
          props.show
            ? 'profile-nav-span gallery'
            : 'profile-nav-span active gallery'
        }
        role="link"
        onClick={() => props.setShow(true)}
      >
        Gallery
      </span>
      <span
        className={props.show ? 'profile-nav-span' : 'profile-nav-span active'}
        role="link"
        onClick={() => props.setShow(false)}
      >
        Account
      </span>
    </div>
  );
};

export default ProfileNav;
