import React from 'react';
import { Users } from '../../../api';
import { PasswordFormProps } from '../../forms';
import { AccountActivation, AccountSettings } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface AccountViewProps {
  submitHandler: PasswordFormProps['onSubmit'];
  user: Users.IUser;
}

export default function AccountView({
  submitHandler,
  user,
}: AccountViewProps): React.ReactElement {
  return (
    <DashboardTemplate className="account-view">
      {/* Only show this if the user is not already validated! */}
      {!user.isValidated && <AccountActivation />}
      <AccountSettings submitHandler={submitHandler} />
    </DashboardTemplate>
  );
}
