import React from 'react';
import { Users } from '../../../api';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import { AccountActivation, AccountSettings } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface AccountViewProps {
  submitHandler: AccountEditProps['onSubmit'];
  user: Users.IUser;
  submitted?: boolean;
}

export default function AccountView({
  submitHandler,
  user,
  submitted,
}: AccountViewProps): React.ReactElement {
  return (
    <DashboardTemplate className="account-view">
      {submitted && (
        <div className="success"> Your Changes Have Been Saved</div>
      )}
      {/* Only show this if the user is not already validated! */}
      {!user.isValidated && <AccountActivation />}
      <AccountSettings id={user.id} submitHandler={submitHandler} />
    </DashboardTemplate>
  );
}
