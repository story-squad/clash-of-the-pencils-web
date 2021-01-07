import React from 'react';
import { CodenameForm } from './Forms/CodenameForm';
import { PasswordForm } from './Forms/PasswordForm';

// This component will render the Codename and Password reset forms
const EditProfile = (): React.ReactElement => {
  return (
    <div>
      <CodenameForm />
      <PasswordForm />
    </div>
  );
};

export default EditProfile;
