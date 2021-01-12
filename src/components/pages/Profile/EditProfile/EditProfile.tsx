import React from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../../state';
import { PasswordForm } from './ResetPassword';
import { UsernameForm } from './ResetUsername';

// This component will render the Codename and Password reset forms
const EditProfile = (): React.ReactElement => {
  const username = useRecoilValue(auth.username);
  const email = useRecoilValue(auth.email);
  return (
    <div className="edit-profile">
      <h3 className="profile-details">Codename: {username}</h3>
      <h3 className="profile-details">Email on file: {email}</h3>
      <UsernameForm />
      <PasswordForm />
    </div>
  );
};

export default EditProfile;
