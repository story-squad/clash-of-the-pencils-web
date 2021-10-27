import React from 'react';
import { Users } from '../../../api';
import { AccountActivation } from '../../organisms';
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

      {/* <p>More account tasks...</p> */}
      <div className="coming-soon">
        <p>More features coming&nbsp;soon...</p>
      </div>
    </DashboardTemplate>
  );
}
