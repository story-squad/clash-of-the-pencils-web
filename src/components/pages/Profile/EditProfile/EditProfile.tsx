import React from 'react';
import { CodenameForm } from './CodenameForm';
import { PasswordForm } from './PasswordForm';

// This component will render the Codename and Password reset forms
const EditProfile = (): React.ReactElement => {
  return (
    <div className="edit-profile">
      <CodenameForm />
      <PasswordForm />
    </div>
  );
};

export default EditProfile;
