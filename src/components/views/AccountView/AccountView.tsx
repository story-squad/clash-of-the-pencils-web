import React from 'react';
import { Users } from '../../../api';
import { AccountActivation, AccountSettings } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface AccountViewProps {
  user: Users.IUser;
}

export default function AccountView({
  user,
}: AccountViewProps): React.ReactElement {
  return (
    <DashboardTemplate className="account-view">
      {/* Only show this if the user is not already validated! */}
      {!user.isValidated && <AccountActivation />}

      {/* <div className="coming-soon">
        <p>More features coming&nbsp;soon...</p>
      </div> */}
      <AccountSettings />
    </DashboardTemplate>
  );
}
