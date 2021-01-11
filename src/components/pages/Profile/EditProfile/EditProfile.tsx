import React from 'react';
import { PasswordForm } from './ResetPassword';
import { UsernameForm } from './ResetUsername';

// This component will render the Codename and Password reset forms
const EditProfile = (): React.ReactElement => {
  return (
    <div className="edit-profile">
      <UsernameForm />
      <PasswordForm />
    </div>
  );
};

export default EditProfile;
