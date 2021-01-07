import React from 'react';
import { EditProfile } from '../EditProfile';
import { Gallery } from '../ProfileGallery';

const ProfileNav = (props: {
  show: boolean;
  setShow: (arg: boolean) => void;
}): React.ReactElement => {
  return (
    <div className="profile-nav">
      <span
        role="link"
        className={props.show ? 'active' : ''}
        onClick={() => props.setShow(true)}
      >
        Gallery
      </span>
      <span
        role="link"
        className={!props.show ? 'active' : ''}
        onClick={() => props.setShow(false)}
      >
        Account
      </span>
      <div className="profile-content">
        {props.show ? <Gallery /> : <EditProfile />}
      </div>
    </div>
  );
};

export default ProfileNav;
